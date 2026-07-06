/**
 * Modal.jsx — Accessible modal dialog with focus trap and backdrop.
 */

import { useId, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { PanelHeader } from './primitives';

const Modal = ({ isOpen, onClose, title, children }) => {
  const panelRef = useRef(null);
  const titleId = useId();
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
        aria-labelledby={titleId}
        className="modal-shell"
      >
        <PanelHeader title={title} titleId={titleId} onClose={onClose} closeLabel="Close modal" />
        <div className="modal-shell__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;