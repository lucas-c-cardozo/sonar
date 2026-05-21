'use client';

import { ItemCard } from '@/components/ItemCard';
import { IItem } from '@/types/item';
import { useState } from 'react';
import { Badge } from '../Badge';

interface CollapsibleListProps {
  title: string;
  items: IItem[];
  defaultOpen?: boolean;
  onEditItem: (item: IItem) => void;
  onDeleteItem: (id: string) => void;
  emptyMessage?: string;
}

export function CollapsibleList({
  title,
  items,
  defaultOpen = true,
  onEditItem,
  onDeleteItem,
  emptyMessage = 'Nenhum item nesta lista.',
}: CollapsibleListProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      id={`list-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="mb-4 rounded-2xl overflow-hidden border border-border bg-white"
    >
      {/* Header */}
      <button
        type="button"
        id={`list-toggle-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`w-full flex items-center justify-between px-5 py-4 transition-colors duration-200 ${isOpen ? 'bg-bg-surface border-b border-border' : 'bg-transparent border-none'}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-base text-text-primary">
            {title}
          </span>
          <Badge>{items.length}</Badge>
        </div>

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className={`text-text-muted shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-250 ease-in-out shrink-0`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-4 animate-fade-in bg-white">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-text-muted">
                <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="text-sm text-text-muted">{emptyMessage}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
