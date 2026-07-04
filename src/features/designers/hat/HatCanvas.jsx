/**
 * HatCanvas.jsx — Front-panel hat preview mockup.
 */

const HatCanvas = ({ design, previewLabel }) => {
  const isText = design.inputMode === 'text';

  return (
    <div className="mx-auto w-full max-w-xs">
      <div
        aria-label={previewLabel}
        className="relative mx-auto rounded-lg shadow-md"
        style={{ aspectRatio: '1 / 1' }}
      >
        <div
          className="absolute inset-x-4 bottom-0 top-8 rounded-t-[40%] border border-[#e5e7eb]"
          style={{ backgroundColor: design.hatColor }}
        >
          <div
            className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-full"
            style={{ backgroundColor: design.hatColor, filter: 'brightness(0.9)' }}
            aria-hidden="true"
          />
          <div
            data-hat-print-area
            className="absolute left-1/2 top-[28%] flex w-[55%] -translate-x-1/2 items-center justify-center overflow-hidden rounded border border-dashed border-[#9ca3af]/50 bg-white/5"
            style={{ aspectRatio: '5 / 3', minHeight: '60px' }}
          >
            {isText ? (
              <span
                className="px-2 text-center font-semibold leading-tight"
                style={{ color: design.textColor, fontSize: 'clamp(12px, 4vw, 18px)' }}
              >
                {design.companyName || 'Your text'}
              </span>
            ) : design.imageSrc ? (
              <img
                src={design.imageSrc}
                alt={design.imageFileName || 'Hat logo'}
                className="h-full w-full object-contain"
                style={{
                  transform: `translate(${design.imageX - 25}%, ${design.imageY - 30}%)`,
                }}
                draggable={false}
              />
            ) : (
              <span className="text-xs text-[#9ca3af]">Upload logo</span>
            )}
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#9ca3af]">
        Structured 6-panel · vinyl print · one size fits most
      </p>
    </div>
  );
};

export default HatCanvas;