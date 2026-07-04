/**
 * Modal.jsx — Accessible modal dialog with focus trap and backdrop.
 */

import { useRef } from 'react';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const Modal = ({ isOpen, onClose, title, children, ariaLabel }) => {
  const panelRef = useRef(null);
  useFocusTrap(isOpen, panelRef, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        className="relative z-10 w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#111111]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#374151] hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#93c5fd]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;