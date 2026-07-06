/**
 * PanelHeader.jsx — Shared header for offcanvas and modal panels.
 */

import { X } from 'lucide-react';
import IconButton from './IconButton';

const PanelHeader = ({ title, titleId, onClose, closeLabel = 'Close panel' }) => (
  <header className="panel-header">
    <h2 id={titleId} className="panel-header__title">
      {title}
    </h2>
    <IconButton label={closeLabel} onClick={onClose}>
      <X size={20} aria-hidden="true" />
    </IconButton>
  </header>
);

export default PanelHeader;