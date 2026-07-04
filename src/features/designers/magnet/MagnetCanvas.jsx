/**
 * MagnetCanvas.jsx — 12" × 24" landscape magnet preview.
 */

const MagnetCanvas = ({ design, previewLabel }) => {
  const isText = design.inputMode === 'text';

  return (
    <div className="mx-auto w-full max-w-md">
      <div
        aria-label={previewLabel}
        className="relative mx-auto overflow-hidden rounded-lg border-2 border-[#374151] bg-white shadow-md"
        style={{ aspectRatio: '2 / 1' }}
      >
        <div className="absolute inset-4 flex items-center justify-center overflow-hidden rounded border border-dashed border-[#9ca3af]/50">
          {isText ? (
            <span
              className="px-4 text-center text-xl font-semibold"
              style={{ color: design.textColor }}
            >
              {design.companyName || 'Your text'}
            </span>
          ) : design.imageSrc ? (
            <img
              src={design.imageSrc}
              alt={design.imageFileName || 'Magnet graphic'}
              className="h-full w-full object-contain"
              draggable={false}
            />
          ) : (
            <span className="text-sm text-[#9ca3af]">Upload graphic</span>
          )}
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#9ca3af]">12&quot; × 24&quot; full color digital · landscape</p>
    </div>
  );
};

export default MagnetCanvas;