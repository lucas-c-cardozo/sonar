'use client';

import React, { useState, useEffect } from 'react';
import { IItem, ItemType, ITEM_TYPES, FIXED_LISTS } from '@/types/item';
import { MultiSelectCreatable } from '@/components/MultiSelectCreatable';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { mockGenres, mockTags, mockArtists, mockRecommenders } from '@/data/mockData';
import { v4 as uuidv4 } from 'uuid';

interface ItemFormModalProps {
  isOpen: boolean;
  editItem?: IItem | null;
  onClose: () => void;
  onSubmit: (item: IItem) => void;
  initialData?: Partial<IItem>;
}

const empty = (): IItem => ({
  id: uuidv4(),
  title: '',
  artists: [],
  type: 'Álbum',
  coverUrl: '',
  recommendedBy: [],
  genres: [],
  tags: [],
  lists: [],
});

export function ItemFormModal({ isOpen, editItem, onClose, onSubmit, initialData }: ItemFormModalProps) {
  const isEditing = !!editItem;
  const [form, setForm] = useState<IItem>(empty());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic option lists
  const [artistOptions, setArtistOptions] = useState(mockArtists);
  const [genreOptions, setGenreOptions] = useState(mockGenres);
  const [tagOptions, setTagOptions] = useState(mockTags);
  const [recommenderOptions, setRecommenderOptions] = useState(mockRecommenders);
  const [listOptions] = useState([...FIXED_LISTS]);

  useEffect(() => {
    if (!isOpen) return;
    if (editItem) {
      setForm({ ...editItem });
    } else if (initialData) {
      setForm({ ...empty(), ...initialData });
    } else {
      setForm(empty());
    }
    setErrors({});
  }, [isOpen, editItem, initialData]);

  const set = <K extends keyof IItem>(key: K, val: IItem[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const copy = { ...e }; delete copy[key]; return copy; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Título é obrigatório.';
    if (form.artists.length === 0) errs.artists = 'Adicione pelo menos um artista.';
    if (form.genres.length === 0) errs.genres = 'Adicione pelo menos um gênero.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitClick = () => {
    if (!validate()) return;
    if (isEditing) {
      setShowSubmitConfirm(true);
    } else {
      onSubmit({ ...form, id: form.id || uuidv4() });
      onClose();
    }
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirm(false);
    onSubmit({ ...form });
    onClose();
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
        onClick={handleCancelClick}
      >
        <div
          className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in"
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
            style={{
              background: 'var(--bg-white)',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              {isEditing ? 'Editar Item' : 'Adicionar Item'}
            </h2>
            <button
              id="form-modal-close-btn"
              type="button"
              onClick={handleCancelClick}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 text-lg"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              ×
            </button>
          </div>

          {/* Form */}
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Título <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                id="form-title"
                type="text"
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
                style={{
                  background: 'var(--bg-white)',
                  border: `1px solid ${errors.title ? 'var(--color-danger)' : 'var(--border-color)'}`,
                  color: 'var(--text-primary)',
                }}
                placeholder="Nome do álbum, single, etc."
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                onFocus={(e) => { if (!errors.title) e.target.style.borderColor = 'var(--color-accent-light)'; }}
                onBlur={(e) => { if (!errors.title) e.target.style.borderColor = 'var(--border-color)'; }}
              />
              {errors.title && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{errors.title}</p>}
            </div>

            {/* Artists */}
            <div>
              <MultiSelectCreatable
                id="form-artists"
                label="Artistas *"
                options={artistOptions}
                value={form.artists}
                onChange={(v) => set('artists', v)}
                onOptionsChange={setArtistOptions}
                placeholder="Selecionar artistas..."
              />
              {errors.artists && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{errors.artists}</p>}
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Tipo
              </label>
              <select
                id="form-type"
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all cursor-pointer"
                style={{
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  appearance: 'none',
                }}
                value={form.type}
                onChange={(e) => set('type', e.target.value as ItemType)}
                onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent-light)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
              >
                {ITEM_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Cover URL */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                Capa / Arte (URL, opcional)
              </label>
              <input
                id="form-cover"
                type="url"
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
                style={{
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                placeholder="https://..."
                value={form.coverUrl || ''}
                onChange={(e) => set('coverUrl', e.target.value)}
                onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent-light)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
              />
            </div>

            {/* Genres */}
            <div>
              <MultiSelectCreatable
                id="form-genres"
                label="Gêneros *"
                options={genreOptions}
                value={form.genres}
                onChange={(v) => set('genres', v)}
                onOptionsChange={setGenreOptions}
                placeholder="Selecionar gêneros..."
              />
              {errors.genres && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{errors.genres}</p>}
            </div>

            {/* Tags */}
            <MultiSelectCreatable
              id="form-tags"
              label="Tags"
              options={tagOptions}
              value={form.tags}
              onChange={(v) => set('tags', v)}
              onOptionsChange={setTagOptions}
              placeholder="Selecionar tags..."
            />

            {/* Recommended by */}
            <MultiSelectCreatable
              id="form-recommended-by"
              label="Recomendado por (opcional)"
              options={recommenderOptions}
              value={form.recommendedBy || []}
              onChange={(v) => set('recommendedBy', v)}
              onOptionsChange={setRecommenderOptions}
              placeholder="Quem recomendou?"
            />

            {/* Lists */}
            <MultiSelectCreatable
              id="form-lists"
              label="Listas"
              options={listOptions}
              value={form.lists}
              onChange={(v) => set('lists', v)}
              placeholder="Adicionar às listas..."
            />
          </div>

          {/* Footer */}
          <div
            className="flex gap-3 px-6 py-4 sticky bottom-0"
            style={{ background: 'var(--bg-white)', borderTop: '1px solid var(--border-color)' }}
          >
            <button
              id="form-modal-cancel-btn"
              type="button"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
            <button
              id="form-modal-submit-btn"
              type="button"
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{
                background: 'var(--color-accent)',
                boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
              }}
              onClick={handleSubmitClick}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>

      {/* Confirm cancel */}
      <ConfirmationModal
        isOpen={showCancelConfirm}
        title="Deseja cancelar?"
        message="As alterações não salvas serão descartadas."
        confirmLabel="Sim, cancelar"
        cancelLabel="Voltar"
        danger={false}
        onConfirm={() => { setShowCancelConfirm(false); onClose(); }}
        onCancel={() => setShowCancelConfirm(false)}
      />

      {/* Confirm edit submit */}
      <ConfirmationModal
        isOpen={showSubmitConfirm}
        title="Confirmar edição?"
        message="A alteração não poderá ser desfeita."
        confirmLabel="Confirmar"
        cancelLabel="Voltar"
        danger={true}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowSubmitConfirm(false)}
      />
    </>
  );
}
