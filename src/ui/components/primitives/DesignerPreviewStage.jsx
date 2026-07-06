/**
 * DesignerPreviewStage.jsx — Keyboard-focusable product preview region.
 */

const DesignerPreviewStage = ({ previewLabel, className = '', style, children }) => (
  <div
    role="img"
    aria-label={previewLabel}
    tabIndex={0}
    className={className}
    style={style}
  >
    {children}
  </div>
);

export default DesignerPreviewStage;