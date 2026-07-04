/**
 * PanelHeader.jsx — Shared header for offcanvas and modal panels.
 */

import { X } from 'lucide-react';
import IconButton from './IconButton';

const PanelHeader = ({ title, onClose }) => (
  <header className="panel-header">
    <h2 className="panel-header__title">{title}</h2>
    <IconButton label="Close panel" onClick={onClose}>
      <X size={20} aria-hidden="true" />
    </IconButton>
  </header>
);

export default PanelHeader;