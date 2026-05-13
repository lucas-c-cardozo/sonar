'use client';

import React, { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
  id?: string;
  label?: React.ReactNode;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ id, label, options, value, onChange, placeholder = 'Selecione ou pesquise..' }: MultiSelectProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter(
    (o) => !value.includes(o) && o.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const select = (opt: string) => {
    onChange([...value, opt]);
    setQuery('');
  };

  const remove = (opt: string) => {
    onChange(value.filter((v) => v !== opt));
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}

      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1.5">
          {value.map((v) => (
            <span
              key={v}
              className="badge text-white flex items-center gap-1"
              style={{ background: 'var(--color-accent)', fontSize: '0.7rem' }}
            >
              {v}
              <button
                type="button"
                onClick={() => remove(v)}
                className="hover:opacity-70 leading-none ml-0.5"
                aria-label={`Remover ${v}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input row: hamburger + input + search + info */}
      <div className="flex items-center gap-1.5">
        <div
          className="flex items-center flex-1 rounded-lg px-3 py-2 cursor-text gap-2"
          style={{
            background: 'var(--bg-white)',
            border: `1px solid ${open ? 'var(--color-accent-light)' : 'var(--border-color)'}`,
            transition: 'border-color 0.2s',
            boxShadow: open ? '0 0 0 3px rgba(124,58,237,0.1)' : 'none',
          }}
          onClick={() => { setOpen(true); (containerRef.current?.querySelector('input') as HTMLInputElement)?.focus(); }}
        >
          {/* Hamburger icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <input
            id={id}
            type="text"
            className="flex-1 bg-transparent text-sm outline-none min-w-0"
            style={{ color: 'var(--text-primary)' }}
            placeholder={value.length === 0 ? placeholder : 'Adicionar mais...'}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            autoComplete="off"
          />

          {/* Search icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Info button ⓘ */}
        <button type="button" className="info-btn" aria-label="Informação">
          i
        </button>
      </div>

      {/* Dropdown */}
      {open && filtered.length > 0 && (
        <ul
          className="absolute z-50 mt-1 w-full rounded-lg py-1 shadow-xl max-h-48 overflow-auto"
          style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-color)',
          }}
        >
          {filtered.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm transition-colors duration-100"
                style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'var(--bg-surface)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
                onClick={() => select(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && filtered.length === 0 && query && (
        <div
          className="absolute z-50 mt-1 w-full rounded-lg py-2 px-3 text-sm shadow-xl"
          style={{ background: 'var(--bg-white)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          Nenhuma opção encontrada
        </div>
      )}
    </div>
  );
}
