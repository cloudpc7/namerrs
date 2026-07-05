/**
 * HatCanvas.jsx — SVG structured cap preview with front-panel print area.
 */

import {
  HAT_BUTTON,
  HAT_CROWN_BRIM_STITCH,
  HAT_PANEL_SEAMS,
  HAT_PRINT_SURFACE,
  HAT_SHAPE_PATH,
} from './constants';
import { normalizeHexColor } from '../../../utils/colorUtils';

const isLightHatColor = (value) => {
  const hex = normalizeHexColor(value);
  if (!hex) {
    return false;
  }

  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62;
};

const HatCanvas = ({ design, previewLabel }) => {
  const isText = design.inputMode === 'text';
  const isLightHat = isLightHatColor(design.hatColor);

  return (
    <div className="hat-canvas">
      <div className="hat-canvas__mockup-wrap">
        <div aria-label={previewLabel} className="hat-canvas__stage">
          <div
            className={`hat-canvas__cap${
              isLightHat ? ' hat-canvas__cap--light' : ' hat-canvas__cap--dark'
            }`}
          >
            <svg
              className="hat-canvas__shape"
              viewBox="0 0 200 140"
              aria-hidden="true"
              focusable="false"
            >
              <path d={HAT_SHAPE_PATH} fill={design.hatColor} stroke="none" />
              <path
                className="hat-canvas__crown-brim-stitch"
                d={HAT_CROWN_BRIM_STITCH}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                vectorEffect="non-scaling-stroke"
              />
              {HAT_PANEL_SEAMS.map((seam) => (
                <path
                  key={seam}
                  className="hat-canvas__seam"
                  d={seam}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <circle
                className="hat-canvas__button"
                cx={HAT_BUTTON.cx}
                cy={HAT_BUTTON.cy}
                r={HAT_BUTTON.r}
                fill={design.hatColor}
                stroke="currentColor"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className={`hat-canvas__outline${isLightHat ? ' hat-canvas__outline--light' : ''}`}
                d={HAT_SHAPE_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div
              data-hat-print-area
              className="hat-canvas__print-area"
              style={{
                top: `${HAT_PRINT_SURFACE.top}%`,
                left: `${HAT_PRINT_SURFACE.left}%`,
                width: `${HAT_PRINT_SURFACE.width}%`,
                height: `${HAT_PRINT_SURFACE.height}%`,
              }}
            >
              {isText ? (
                <span className="hat-canvas__text" style={{ color: design.textColor }}>
                  {design.companyName || 'Your text'}
                </span>
              ) : design.imageSrc ? (
                <img
                  src={design.imageSrc}
                  alt={design.imageFileName || 'Hat logo'}
                  className="hat-canvas__image"
                  draggable={false}
                />
              ) : (
                <span className="hat-canvas__placeholder">Upload logo</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="hat-canvas__hint">
        Structured 6-panel · vinyl print · one size fits most
      </p>
    </div>
  );
};

export default HatCanvas;