/**
 * Modal.jsx — Accessible modal dialog with focus trap and backdrop.
 */

import { useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { PanelHeader } from './primitives';

const Modal = ({ isOpen, onClose, title, children, ariaLabel }) => {
  const panelRef = useRef(null);
  useFocusTrap(isOpen, panelRef, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="modal-backdrop__overlay"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        className="modal-shell"
      >
        <PanelHeader title={title} onClose={onClose} />
        <div className="modal-shell__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;