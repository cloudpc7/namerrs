/**
 * MemorialCanvas.jsx — Memorial print/sticker preview.
 */

import { getSelectedSize } from './designModel';
import { DesignerPreviewStage } from '../../../ui/components/primitives';

const MemorialCanvas = ({ design, previewLabel }) => {
  const size = getSelectedSize(design);
  const isText = design.inputMode === 'text';

  return (
    <div className="memorial-canvas">
      <div className="memorial-canvas__mockup-wrap">
        <DesignerPreviewStage
          previewLabel={previewLabel}
          className="memorial-canvas__preview"
          style={{
            aspectRatio: size.aspect,
            backgroundColor: design.backgroundColor,
          }}
        >
          <div className="memorial-canvas__content">
            {isText ? (
              <>
                <p className="memorial-canvas__name" style={{ color: design.textColor }}>
                  {design.name || 'Name'}
                </p>
                {design.datesMessage && (
                  <p className="memorial-canvas__message" style={{ color: design.textColor }}>
                    {design.datesMessage}
                  </p>
                )}
              </>
            ) : design.imageSrc ? (
              <img
                src={design.imageSrc}
                alt={design.imageFileName || 'Memorial photo'}
                className="memorial-canvas__image"
                draggable={false}
              />
            ) : (
              <span className="memorial-canvas__placeholder">Upload photo</span>
            )}
          </div>
        </DesignerPreviewStage>
      </div>
      <p className="memorial-canvas__hint">{size.label} · full color digital</p>
    </div>
  );
};

export default MemorialCanvas;