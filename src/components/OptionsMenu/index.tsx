'use client';

import React, { useRef, useEffect } from 'react';

interface OptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  showAdd?: boolean;
  onAdd?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function OptionsMenu({ isOpen, onClose, triggerRef, showAdd, onAdd, onEdit, onDelete }: OptionsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const menuItem = (onClick: () => void, label: string, danger = false, icon: React.ReactNode) => (
    <button
      type="button"
      className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors duration-100 rounded-lg"
      style={{ color: danger ? 'var(--color-danger)' : 'var(--text-primary)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = danger ? 'rgba(239,68,68,0.08)' : 'var(--bg-surface)';
      }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
      onClick={() => { onClick(); onClose(); }}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-8 z-50 rounded-xl py-1 px-1 w-44 shadow-2xl animate-fade-in"
      style={{
        background: 'var(--bg-white)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}
    >
      {showAdd && onAdd && menuItem(onAdd, 'Adicionar', false,
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      )}
      {menuItem(onEdit, 'Editar', false,
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      )}
      <div style={{ height: '1px', background: 'var(--border-color)', margin: '2px 0' }} />
      {menuItem(onDelete, 'Excluir', true,
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </div>
  );
}
