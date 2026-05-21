'use client';

import { OptionsMenu } from '@/components/OptionsMenu';
import { IItem } from '@/types/item';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Badge } from '../Badge';

interface ItemCardProps {
  item: IItem;
  onEdit: (item: IItem) => void;
  onDelete: (id: string) => void;
  onAdd?: (item: IItem) => void;
}

export function ItemCard({ item, onEdit, onDelete, onAdd }: ItemCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const isHighlighted = item.isGeneratedRecommendation;

  return (
    <article
      className={`relative rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in w-fit justify-self-center border ${isHighlighted ? 'bg-[#fef9ee] border-highlight shadow-[0_0.25rem_1.25rem] shadow-highlight/15' : 'bg-white border-border shadow-[0_0.125rem_0.5rem] shadow-black/6' }`}
    >
      {/* Highlighted ribbon */}
      {isHighlighted && (
        <div className="absolute top-0 left-0 right-0 text-xs text-center py-0.5 font-semibold z-10 bg-highlight text-text-primary">
          ★ Recomendação Sonar
        </div>
      )}

      {/* Cover art */}
      <div className={`w-full aspect-square relative overflow-hidden shrink-0 ${isHighlighted ? 'mt-5' : 'mt-0'}`}>
        {item.coverUrl && !imgError ? (
          <Image
            src={item.coverUrl}
            alt={`Capa de ${item.title}`}
            className="w-auto h-auto object-cover"
            onError={() => setImgError(true)}
            height={300}
            width={300}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[linear-gradient(135deg,var(--bg-surface),var(--bg-surface-alt))]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-text-muted">
              <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col gap-1.5">
        {/* Options button — vertical dots */}
        <div className="absolute top-2 right-2 z-20">
          <div className="relative">
            <button
              ref={btnRef}
              id={`item-menu-btn-${item.id}`}
              type="button"
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150 bg-${menuOpen? 'bg-surface-hover' : 'white/85'} backdrop-blur-xs text-text-secondary`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Opções"
            >
              {/* Vertical dots ⋮ */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
              </svg>
            </button>
            <OptionsMenu
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              triggerRef={btnRef}
              showAdd={isHighlighted}
              onAdd={onAdd ? () => onAdd(item) : undefined}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
            />
          </div>
        </div>

        {/* Title */}
        <div className="pr-6">
          <h3 className="font-bold text-sm leading-tight truncate text-text-primary">
            {item.title}
          </h3>
          <p className="text-xs truncate mt-0.5 text-text-secondary">
            {item.artists.join(', ')}
          </p>
        </div>

        {/* Type badge */}
        <Badge>{item.type}</Badge>

        {/* Recommended by */}
        {item.recommendedBy && item.recommendedBy.length > 0 && (
          <p className="text-xs text-text-secondary">
            <span className="text-text-muted">Recomendado por: </span>
            <span className={`text-${isHighlighted ? 'highlight' : 'accent'}`}>
              {item.recommendedBy.join(', ')}
            </span>
          </p>
        )}

        {/* Genres */}
        {item.genres.length > 0 && (
          <div>
            <span className="text-xs text-text-muted">Gênero: </span>
            <span className="text-xs text-text-secondary">
              {item.genres.slice(0, 3).join(', ')}
              {item.genres.length > 3 && ` +${item.genres.length - 3}`}
            </span>
          </div>
        )}

        {/* Tags */}
        {item.tags.length > 0 && (
          <div>
            <span className="text-xs text-text-muted">Tags: </span>
            <span className="text-xs text-text-secondary">
              {item.tags.slice(0, 3).join(', ')}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
