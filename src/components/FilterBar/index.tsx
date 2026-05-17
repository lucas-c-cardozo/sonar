'use client';

import { MultiSelect } from '@/components/MultiSelect';
import { mockArtists, mockGenres, mockRecommenders, mockTags } from '@/data/mockData';
import { FilterState, FIXED_LISTS, ITEM_TYPES } from '@/types/item';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onSearch: () => void;
  onClear: () => void;
  onAddItem: () => void;
}

export function FilterBar({ filters, onChange, onSearch, onClear, onAddItem }: FilterBarProps) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val });

  return (
    <section
      id="filter-bar"
      className="rounded-2xl p-6 mb-6"
      style={{
        background: '#917AC7',
        border: '1px solid var(--border-accent)',
      }}
    >
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-primary)' }}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 7h8M8 12h5M8 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          Filtros
        </h2>
      </div>

      {/* Filters Grid — 3 columns matching Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Row 1: Tag(s), Gênero(s), Artista(s) */}
        <MultiSelect
          id="filter-tags"
          label="Tag(s)"
          options={mockTags}
          value={filters.tags}
          onChange={(v) => set('tags', v)}
          placeholder="Selecione ou pesquise.."
        />

        <MultiSelect
          id="filter-genres"
          label="Gênero(s)"
          options={mockGenres}
          value={filters.genres}
          onChange={(v) => set('genres', v)}
          placeholder="Selecione ou pesquise.."
        />

        <MultiSelect
          id="filter-artists"
          label="Artista(s)"
          options={mockArtists}
          value={filters.artists}
          onChange={(v) => set('artists', v)}
          placeholder="Selecione ou pesquise.."
        />

        {/* Row 2: Lista(s), Recomendado por, Título */}
        <MultiSelect
          id="filter-lists"
          label="Lista(s)"
          options={[...FIXED_LISTS]}
          value={filters.lists}
          onChange={(v) => set('lists', v)}
          placeholder="Selecione ou pesquise.."
        />

        <MultiSelect
          id="filter-recommended-by"
          label="Recomendado por"
          options={mockRecommenders}
          value={filters.recommendedBy}
          onChange={(v) => set('recommendedBy', v)}
          placeholder="Selecione ou pesquise.."
        />

        {/* Title — text input styled to match CSM inputs */}
        <div className="relative">
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
            Título
          </label>
          <div className="flex items-center gap-1.5">
            <div
              className="flex items-center flex-1 rounded-lg px-3 py-2 gap-2"
              style={{
                background: 'var(--bg-white)',
                border: `1px solid ${filters.title ? 'var(--color-accent-light)' : 'var(--border-color)'}`,
                transition: 'border-color 0.2s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                id="filter-title"
                type="text"
                className="flex-1 bg-transparent text-sm outline-none min-w-0"
                style={{ color: 'var(--text-primary)' }}
                placeholder="Selecione ou pesquise.."
                value={filters.title}
                onChange={(e) => set('title', e.target.value)}
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <button type="button" className="size-6 rounded-full flex items-center justify-center bg-accent text-white text-xs font-bold shrink-0 cursor-pointer transition hover:bg-accent-dark hover:scale-110" aria-label="Informação">i</button>
          </div>
        </div>

        {/* Row 3: Tipo(s) — alone */}
        <MultiSelect
          id="filter-types"
          label="Tipo(s)"
          options={[...ITEM_TYPES]}
          value={filters.types}
          onChange={(v) => set('types', v)}
          placeholder="Selecione ou pesquise.."
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        {/* Limpar filtros — outline style */}
        <button
          id="filter-clear-btn"
          onClick={onClear}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-95"
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-accent)' }}>
            <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Limpar filtros
        </button>

        {/* Pesquisar — filled purple */}
        <button
          id="filter-search-btn"
          onClick={onSearch}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{
            background: 'var(--color-accent)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Pesquisar
        </button>

        {/* + Adicionar novo item — filled darker purple */}
        <button
          id="filter-add-btn"
          onClick={onAddItem}
          className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{
            background: 'var(--color-accent-dark)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Adicionar novo item
        </button>
      </div>
    </section>
  );
}
