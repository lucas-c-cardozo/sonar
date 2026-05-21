'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '../Badge';

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
        <label htmlFor={id} className="block text-xs font-semibold mb-1.5 text-text-primary">
          {label}
        </label>
      )}

      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1.5">
          {value.map((v) => (
            <Badge key={v}>
              {v}
              <button
                type="button"
                onClick={() => remove(v)}
                className="hover:opacity-70 leading-none ml-0.5"
                aria-label={`Remover ${v}`}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input row: hamburger + input + search + info */}
      <div className="flex items-center gap-1.5">
        <div
          className={`flex items-center flex-1 rounded-lg px-3 py-2 cursor-text gap-2 bg-white border ${open ? 'border-accent-light ring-3 ring-accent/10' : 'border-border ring-0'} transition-[border-color,box-shadow] duration-200 `}
          onClick={() => { setOpen(true); (containerRef.current?.querySelector('input') as HTMLInputElement)?.focus(); }}
        >
          {/* Hamburger icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-text-muted shrink-0">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <input
            id={id}
            type="text"
            className="flex-1 bg-transparent text-sm outline-none min-w-0 text-text-primary"
            placeholder={!value.length ? placeholder : 'Adicionar mais...'}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            autoComplete="off"
          />

          {/* Search icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-text-muted shrink-0">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Info button ⓘ */}
        <button type="button" className="size-6 rounded-full flex items-center justify-center bg-accent text-white text-xs font-bold shrink-0 cursor-pointer transition hover:bg-accent-dark hover:scale-110" aria-label="Informação">
          i
        </button>
      </div>

      {/* Dropdown */}
      {open && filtered.length > 0 && (
        <ul
          className="absolute z-50 mt-1 w-full rounded-lg py-1 shadow-xl max-h-48 overflow-auto bg-white border border-border"
        >
          {filtered.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm transition-colors duration-100 text-text-primary bg-transparent hover:bg-bg-surface"
                onClick={() => select(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && !filtered.length && query && (
        <div
          className="absolute z-50 mt-1 w-full rounded-lg py-2 px-3 text-sm shadow-xl bg-white border border-border text-text-muted"
        >
          Nenhuma opção encontrada
        </div>
      )}
    </div>
  );
}
