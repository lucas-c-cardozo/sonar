'use client';

import { CollapsibleList } from '@/components/CollapsibleList';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { FilterBar } from '@/components/FilterBar';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { ItemFormModal } from '@/components/ItemFormModal';
import { RecommendationSection } from '@/components/RecommendationSection';
import { useFilteredItems, useItemsByList, useItemStore } from '@/hooks/useItems';
import { EMPTY_FILTERS, FilterState, FIXED_LISTS, IItem } from '@/types/item';
import { useCallback, useMemo, useState } from 'react';

export default function Home() {
  const { items, createItem, updateItem, deleteItem } = useItemStore();

  // Filters
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [activeFilters, setActiveFilters] = useState<FilterState>(EMPTY_FILTERS);
  const isFiltering = Object.values(activeFilters).some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== ''
  );

  const filteredItems = useFilteredItems(items, activeFilters);

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IItem | null>(null);
  const [prefillData, setPrefillData] = useState<Partial<IItem> | undefined>(undefined);

  // Delete confirmation
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Custom lists (created by user)
  const [customLists, setCustomLists] = useState<string[]>([]);

  // Create list modal
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');

  // All lists = fixed + custom
  const allLists = useMemo(() => [...FIXED_LISTS, ...customLists], [customLists]);

  // Filter handler
  const handleSearch = useCallback(() => {
    setActiveFilters({ ...filters });
  }, [filters]);

  const handleClearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setActiveFilters(EMPTY_FILTERS);
  }, []);

  // Form handlers
  const openAddModal = useCallback((initial?: Partial<IItem>) => {
    setEditingItem(null);
    setPrefillData(initial);
    setFormOpen(true);
  }, []);

  const openEditModal = useCallback((item: IItem) => {
    setEditingItem(item);
    setPrefillData(undefined);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = useCallback((item: IItem) => {
    // Collect any new lists created in the form
    const newLists = item.lists.filter((l) => !FIXED_LISTS.includes(l as never) && !customLists.includes(l));
    if (newLists.length > 0) setCustomLists((prev) => [...prev, ...newLists]);

    if (editingItem) {
      updateItem(item);
    } else {
      createItem(item);
    }
  }, [editingItem, updateItem, createItem, customLists]);

  const handleDeleteRequest = useCallback((id: string) => {
    setDeleteId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteId) deleteItem(deleteId);
    setDeleteId(null);
  }, [deleteId, deleteItem]);

  // Scroll to list
  const handleScrollToList = useCallback((listName: string) => {
    const el = document.getElementById(`list-${listName.replace(/\s+/g, '-').toLowerCase()}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Create new list
  const handleCreateList = useCallback(() => {
    setShowCreateList(true);
  }, []);

  const confirmCreateList = useCallback(() => {
    const trimmed = newListName.trim();
    if (trimmed && !allLists.includes(trimmed)) {
      setCustomLists((prev) => [...prev, trimmed]);
    }
    setNewListName('');
    setShowCreateList(false);
  }, [newListName, allLists]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onSearch={handleSearch}
          onClear={handleClearFilters}
          onAddItem={() => openAddModal()}
        />

        {/* Active filter notice */}
        {isFiltering && (
          <div
            className="mb-4 px-4 py-2.5 rounded-xl text-sm text-accent flex items-center justify-between animate-fade-in bg-accent/8 border border-accent/20"
          >
            <span>🔍 Mostrando {filteredItems.length} resultado(s) filtrado(s)</span>
            <button
              className="text-xs underline hover:opacity-70 font-semibold"
              onClick={handleClearFilters}
            >
              Limpar
            </button>
          </div>
        )}

        {/* Recommendation Section */}
        <RecommendationSection
          items={items}
          onAddItem={(item) => openAddModal(item)}
          onEditItem={openEditModal}
          onDeleteItem={handleDeleteRequest}
          allLists={allLists}
          onScrollToList={handleScrollToList}
          onCreateList={handleCreateList}
        />

        {/* Lists */}
        {isFiltering ? (
          /* When filtering, show a single flat list of results */
          <section className="rounded-2xl p-5 bg-white border border-border">
            <h2 className="text-sm text-text-muted font-bold uppercase tracking-widest mb-4">
              Resultados
            </h2>
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center py-12 gap-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-text-muted">
                  <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <p className="text-base font-semibold text-text-secondary">Nenhum item encontrado</p>
                <p className="text-sm text-text-muted">Tente outros filtros ou limpe a busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {filteredItems.map((item) => (
                  <FilteredItemCard
                    key={item.id}
                    item={item}
                    onEdit={openEditModal}
                    onDelete={handleDeleteRequest}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          /* Normal view: each list */
          <>
            {allLists.map((listName, i) => (
              <ListSection
                key={listName}
                listName={listName}
                items={items}
                defaultOpen={i < 3}
                onEdit={openEditModal}
                onDelete={handleDeleteRequest}
              />
            ))}
          </>
        )}
      </main>

      <Footer />

      {/* Item Form Modal */}
      <ItemFormModal
        isOpen={formOpen}
        editItem={editingItem}
        initialData={prefillData}
        onClose={() => { setFormOpen(false); setEditingItem(null); setPrefillData(undefined); }}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!deleteId}
        title="Excluir item?"
        message="O item será removido permanentemente. A alteração não poderá ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        danger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Create List Modal */}
      {showCreateList && (
        <div
          className="fixed inset-0 z-80 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[.375rem]"
          onClick={() => setShowCreateList(false)}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm animate-fade-in bg-white border border-border shadow-[0_1.5625rem_3.75rem] shadow-black/15"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg text-text-primary font-bold mb-4">
              Criar nova lista
            </h2>
            <input
              type="text"
              className="w-full rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none mb-4 bg-white border border-border"
              placeholder="Nome da lista..."
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') confirmCreateList(); }}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-xl text-sm text-text-secondary font-semibold bg-bg-surface border border-border"
                onClick={() => { setShowCreateList(false); setNewListName(''); }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 bg-accent shadow-[0_.25rem_.75rem] shadow-accent/30"
                onClick={confirmCreateList}
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Extracted to avoid re-render issues with hooks inside map
function ListSection({
  listName,
  items,
  defaultOpen,
  onEdit,
  onDelete,
}: {
  listName: string;
  items: IItem[];
  defaultOpen: boolean;
  onEdit: (item: IItem) => void;
  onDelete: (id: string) => void;
}) {
  const listItems = useItemsByList(items, listName);
  return (
    <CollapsibleList
      title={listName}
      items={listItems}
      defaultOpen={defaultOpen}
      onEditItem={onEdit}
      onDeleteItem={onDelete}
    />
  );
}

// Simple wrapper for filtered results
function FilteredItemCard({
  item,
  onEdit,
  onDelete,
}: {
  item: IItem;
  onEdit: (item: IItem) => void;
  onDelete: (id: string) => void;
}) {
  return <ItemCard item={item} onEdit={onEdit} onDelete={onDelete} />;
}
