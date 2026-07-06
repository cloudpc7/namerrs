/**
 * MagnetCanvas.jsx — 12" × 24" landscape vehicle magnet preview.
 */

import { MAGNET_SIZE } from './designModel';
import { DesignerPreviewStage } from '../../../ui/components/primitives';

const MagnetCanvas = ({ design, previewLabel }) => {
  const isText = design.inputMode === 'text';

  return (
    <div className="magnet-canvas">
      <div className="magnet-canvas__mockup-wrap">
        <DesignerPreviewStage
          previewLabel={previewLabel}
          className="magnet-canvas__preview"
          style={{
            aspectRatio: '2 / 1',
            backgroundColor: design.hatColor,
          }}
        >
          <div className="magnet-canvas__print-area">
            {isText ? (
              <span className="magnet-canvas__text" style={{ color: design.textColor }}>
                {design.companyName || 'Your text'}
              </span>
            ) : design.imageSrc ? (
              <img
                src={design.imageSrc}
                alt={design.imageFileName || 'Magnet graphic'}
                className="magnet-canvas__image"
                draggable={false}
              />
            ) : (
              <span className="magnet-canvas__placeholder">Upload graphic</span>
            )}
          </div>
        </DesignerPreviewStage>
      </div>
      <p className="magnet-canvas__hint">
        {MAGNET_SIZE.label} full color digital · landscape
      </p>
    </div>
  );
};

export default MagnetCanvas;