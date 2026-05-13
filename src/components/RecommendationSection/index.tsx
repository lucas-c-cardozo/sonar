'use client';

import React, { useState, useCallback } from 'react';
import { IItem, FIXED_LISTS } from '@/types/item';
import { ItemCard } from '@/components/ItemCard';
import { mockGenres } from '@/data/mockData';

interface RecommendationSectionProps {
  items: IItem[];
  onAddItem: (item: IItem) => void;
  onEditItem: (item: IItem) => void;
  onDeleteItem: (id: string) => void;
  allLists: string[];
  onScrollToList: (listName: string) => void;
  onCreateList?: () => void;
}

// Icons for each fixed list
const listIcons: Record<string, React.ReactNode> = {
  'Em Rotação': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  'Recomendações': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  'Lançamentos Recentes': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" />
    </svg>
  ),
  'Lista de Desejos': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  'Ouvidos': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" strokeLinecap="round" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
    </svg>
  ),
};

const defaultListIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

export function RecommendationSection({
  items,
  onAddItem,
  onEditItem,
  onDeleteItem,
  allLists,
  onScrollToList,
  onCreateList,
}: RecommendationSectionProps) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [recommendation, setRecommendation] = useState<IItem | null>(null);
  const [generating, setGenerating] = useState(false);

  const generate = useCallback(() => {
    if (!selectedGenre) return;
    setGenerating(true);
    setRecommendation(null);

    setTimeout(() => {
      const candidates = items.filter(
        (i) => i.genres.includes(selectedGenre) && !i.isGeneratedRecommendation
      );
      const pool = candidates.length > 0 ? candidates : items;
      const picked = pool[Math.floor(Math.random() * pool.length)];

      if (picked) {
        setRecommendation({
          ...picked,
          id: `rec-${Date.now()}`,
          isGeneratedRecommendation: true,
          recommendedBy: ['Sonar'],
          lists: [],
        });
      }
      setGenerating(false);
    }, 600);
  }, [selectedGenre, items]);

  return (
    <section
      id="recommendation-section"
      className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4"
    >
      {/* ── Column 1: Recommendation Generator ── */}
      <div
        className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[260px]"
        style={{
          background: '#a855f7',
        }}
      >
        {/* Background star decoration */}
        <div className="absolute top-4 left-4 opacity-30">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-extrabold text-white leading-tight mb-1">
            Recomendação
          </h3>
          <h3 className="text-xl font-extrabold text-white leading-tight mb-3">
            de música
          </h3>
          <p className="text-sm text-white/80 mb-6 leading-relaxed">
            Selecione um gênero e deixe o SONAR te surpreender
          </p>
        </div>

        {/* Genre selection bar */}
        <div className="relative z-10 flex items-center gap-2">
          <div
            className="flex items-center flex-1 rounded-lg px-3 py-2.5 gap-2"
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'white', flexShrink: 0, opacity: 0.7 }}>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <select
              id="rec-genre-select"
              className="flex-1 bg-transparent text-sm outline-none min-w-0 text-white"
              style={{ appearance: 'none' }}
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="" style={{ background: '#a855f7', color: 'white' }}>
                Selecione ou pesquise..
              </option>
              {mockGenres.map((g) => (
                <option key={g} value={g} style={{ background: '#a855f7', color: 'white' }}>
                  {g}
                </option>
              ))}
            </select>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'white', flexShrink: 0, opacity: 0.7 }}>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Generate button */}
          <button
            id="rec-generate-btn"
            type="button"
            disabled={!selectedGenre || generating}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 disabled:opacity-40 hover:scale-110 active:scale-95 flex-shrink-0"
            style={{
              background: selectedGenre ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.4)',
            }}
            onClick={generate}
            aria-label="Gerar recomendação"
          >
            {generating ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="40" strokeDashoffset="20" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Background decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute right-12 -bottom-4 w-16 h-16 rounded-full bg-white/5" />
      </div>

      {/* ── Column 2: Recommendation Result ── */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Minha recomendação
          </p>
          <p className="text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>Gerada por </span>
            <span className="font-extrabold text-lg" style={{ color: 'var(--color-accent-dark)' }}>SONAR</span>
          </p>
        </div>

        {recommendation ? (
          <div className="flex-1 max-w-[240px] animate-fade-in">
            <ItemCard
              item={recommendation}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
              onAdd={onAddItem}
            />
          </div>
        ) : (
          <div
            className="flex-1 rounded-xl flex flex-col items-center justify-center p-6 min-h-[200px]"
            style={{
              background: 'var(--bg-white)',
              border: '1px dashed var(--border-color)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
              <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>
              Selecione um gênero e clique para gerar
            </p>
          </div>
        )}
      </div>

      {/* ── Column 3: List Navigation Menu ── */}
      <div
        className="rounded-2xl p-4 flex flex-col gap-1"
        style={{
          background: '#ddd4f7',
          border: '1px solid var(--border-accent)',
        }}
      >
        {allLists.map((listName) => {
          const icon = listIcons[listName] || defaultListIcon;
          const isCustom = !FIXED_LISTS.includes(listName as never);

          return (
            <button
              key={listName}
              type="button"
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] text-left"
              style={{
                color: 'var(--color-accent-dark)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
              onClick={() => onScrollToList(listName)}
            >
              <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{icon}</span>
              <span className="flex-1 truncate">{listName}</span>
              {isCustom && (
                <span className="badge text-xs" style={{ background: 'var(--bg-surface)', color: 'var(--color-accent)', fontSize: '0.6rem' }}>
                  custom
                </span>
              )}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}

        {/* "Listas criadas" / create new list button */}
        {onCreateList && (
          <>
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />
            <button
              type="button"
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] text-left"
              style={{ color: 'var(--color-accent-dark)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              onClick={onCreateList}
            >
              <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>{defaultListIcon}</span>
              <span className="flex-1">Listas criadas</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
