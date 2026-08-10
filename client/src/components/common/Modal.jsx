import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer = null,
  maxWidth = 'max-w-lg',
  showCloseButton = true,
  closeOnOverlayClick = true
}) => {

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      {/* Modal */}
      <div
        className={`
          relative
          w-full
          ${maxWidth}
          max-h-[90vh]
          bg-white
          rounded-xl
          border
          border-slate-200
          shadow-xl
          flex
          flex-col
          overflow-hidden
        `}
        onClick={(event) => event.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">

          <h2
            id="modal-title"
            className="text-base font-semibold text-slate-900"
          >
            {title}
          </h2>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="
                p-1.5
                rounded-md
                text-slate-400
                hover:text-slate-700
                hover:bg-slate-100
                transition-colors
              "
            >
              <X className="w-5 h-5" />
            </button>
          )}

        </div>


        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {children}
        </div>


        {/* Footer */}
        {footer && (
          <div className="px-5 py-4 border-t border-slate-200 bg-slate-50">
            {footer}
          </div>
        )}

      </div>

    </div>
  );
};