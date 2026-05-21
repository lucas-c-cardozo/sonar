'use client';

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
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[.375rem]"
      onClick={onCancel}
    >
      <div
        className="rounded-2xl p-6 w-full max-w-sm animate-fade-in bg-white border border-border shadow-[0_1.5625rem_3.75rem] shadow-black/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-${danger ? 'danger' : 'accent'}/10`}
          >
            ⚠️
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg text-text-primary font-bold mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-sm text-text-secondary mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            id="confirm-modal-cancel-btn"
            type="button"
            className="flex-1 py-2.5 rounded-xl text-sm text-text-secondary font-semibold transition-all duration-200 hover:opacity-80 bg-bg-surface border border-border"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            id="confirm-modal-confirm-btn"
            type="button"
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 shadow-[0_.25rem_.75rem] ${danger ? 'bg-danger shadow-danger/30': 'bg-accent shadow-accent/30'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
