'use client';

import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmationModal({
  isOpen,
  title,
  message = 'A alteração não poderá ser desfeita.',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  danger = true,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}
      onClick={onCancel}
    >
      <div
        className="rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-fade-in"
        style={{
          background: 'var(--bg-white)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{ background: danger ? 'rgba(239,68,68,0.1)' : 'rgba(124,58,237,0.1)' }}
          >
            ⚠️
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            id="confirm-modal-cancel-btn"
            type="button"
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
            }}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            id="confirm-modal-confirm-btn"
            type="button"
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{
              background: danger ? 'var(--color-danger)' : 'var(--color-accent)',
              boxShadow: danger ? '0 4px 12px rgba(239,68,68,0.3)' : '0 4px 12px rgba(124,58,237,0.3)',
            }}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
