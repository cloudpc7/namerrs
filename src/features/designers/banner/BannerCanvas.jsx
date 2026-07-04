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
  onRemoveElement,
}) => {
  const aspectRatio = getAspectRatio(design);
  const { width, height } = getDimensions(design);

  return (
    <div className="mx-auto w-full max-w-lg">
      <div
        aria-label={previewLabel}
        data-banner-canvas
        className="relative mx-auto w-full overflow-hidden rounded-lg border-2 border-[#374151] shadow-md"
        style={{
          aspectRatio,
          backgroundColor: design.backgroundColor,
          maxHeight: '280px',
        }}
      >
        {design.elements.map((element) => (
          <DraggableBannerElement
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            onSelect={onSelectElement}
            onMove={onMoveElement}
            onRemove={onRemoveElement}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-[#9ca3af]">
        {width && height ? `${width} × ${height} ft` : 'Select dimensions'} — drag images to position
      </p>
    </div>
  );
};

export default BannerCanvas;