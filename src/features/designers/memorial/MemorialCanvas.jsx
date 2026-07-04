/**
 * MemorialCanvas.jsx — Memorial print/sticker preview.
 */

import { getSelectedSize } from './designModel';

const MemorialCanvas = ({ design, previewLabel }) => {
  const size = getSelectedSize(design);
  const isText = design.inputMode === 'text';

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        aria-label={previewLabel}
        className="relative mx-auto overflow-hidden rounded-lg border border-[#e5e7eb] shadow-md"
        style={{
          aspectRatio: size.aspect,
          backgroundColor: design.backgroundColor,
        }}
      >
        <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
          {isText ? (
            <>
              <p
                className="font-serif text-lg font-semibold"
                style={{ color: design.textColor }}
              >
                {design.name || 'Name'}
              </p>
              {design.datesMessage && (
                <p className="mt-2 text-sm" style={{ color: design.textColor }}>
                  {design.datesMessage}
                </p>
              )}
            </>
          ) : design.imageSrc ? (
            <img
              src={design.imageSrc}
              alt={design.imageFileName || 'Memorial photo'}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <span className="text-sm text-[#9ca3af]">Upload photo</span>
          )}
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#9ca3af]">{size.label} · full color digital</p>
    </div>
  );
};

export default MemorialCanvas;