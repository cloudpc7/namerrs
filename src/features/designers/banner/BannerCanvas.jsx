/**
 * BannerCanvas.jsx — Scaled banner preview with draggable images.
 */

import DraggableBannerElement from './DraggableBannerElement';
import { getAspectRatio, getDimensions } from './designModel';

const BannerCanvas = ({
  design,
  selectedElementId,
  previewLabel,
  onSelectElement,
  onMoveElement,
  onResizeElement,
  onRemoveElement,
}) => {
  const aspectRatio = getAspectRatio(design);
  const { width, height } = getDimensions(design);

  return (
    <div className="banner-canvas">
      <div
        aria-label={previewLabel}
        data-banner-canvas
        className="banner-canvas__preview"
        style={{
          aspectRatio,
          backgroundColor: design.backgroundColor,
        }}
      >
        {design.elements.map((element) => (
          <DraggableBannerElement
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            onSelect={onSelectElement}
            onMove={onMoveElement}
            onResize={onResizeElement}
            onRemove={onRemoveElement}
          />
        ))}
      </div>
      <p className="banner-canvas__hint">
        {width && height ? `${width} × ${height} ft` : 'Select dimensions'} — drag to move, corner handle to resize
      </p>
    </div>
  );
};

export default BannerCanvas;