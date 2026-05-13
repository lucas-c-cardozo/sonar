'use client';

import React, { useState, useRef } from 'react';
import { MultiSelect } from '@/components/MultiSelect';

interface MultiSelectCreatableProps {
  id?: string;
  label?: React.ReactNode;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  onOptionsChange?: (options: string[]) => void;
  placeholder?: string;
}

export function MultiSelectCreatable({
  id,
  label,
  options,
  value,
  onChange,
  onOptionsChange,
  placeholder,
}: MultiSelectCreatableProps) {
  const [showInput, setShowInput] = useState(false);
  const [newText, setNewText] = useState('');
  const [allOptions, setAllOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePlusClick = () => {
    if (showInput) {
      const trimmed = newText.trim();
      if (trimmed) {
        const updated = allOptions.includes(trimmed) ? allOptions : [...allOptions, trimmed];
        setAllOptions(updated);
        onOptionsChange?.(updated);
        if (!value.includes(trimmed)) {
          onChange([...value, trimmed]);
        }
      }
      setNewText('');
      setShowInput(false);
    } else {
      setShowInput(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <MultiSelect
            id={id}
            label={label}
            options={allOptions}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>

        <button
          type="button"
          onClick={handlePlusClick}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: showInput ? 'var(--color-success)' : 'var(--color-accent)',
            marginTop: label ? '24px' : '0',
            boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
          }}
          aria-label={showInput ? 'Confirmar adição' : 'Adicionar nova opção'}
        >
          {showInput ? '✓' : '+'}
        </button>
      </div>

      {showInput && (
        <div className="mt-1.5 animate-fade-in">
          <input
            ref={inputRef}
            type="text"
            className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-all"
            style={{
              background: 'var(--bg-white)',
              border: '1px solid var(--color-accent-light)',
              color: 'var(--text-primary)',
            }}
            placeholder="Digite para adicionar..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); handlePlusClick(); }
              if (e.key === 'Escape') { setShowInput(false); setNewText(''); }
            }}
          />
        </div>
      )}
    </div>
  );
}
