/**
 * TshirtCanvas.jsx — Shirt mockup with draggable print area.
 */

import { PRINT_AREA_BY_PLACEMENT } from './constants';
import DraggableTshirtElement from './DraggableTshirtElement';

const TshirtCanvas = ({
  design,
  selectedElementId,
  previewLabel,
  onSelectElement,
  onMoveElement,
  onContentChange,
  onRemoveElement,
}) => {
  const printArea = PRINT_AREA_BY_PLACEMENT[design.printPlacement] || PRINT_AREA_BY_PLACEMENT['front-chest'];

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        aria-label={previewLabel}
        className="relative overflow-hidden rounded-t-[3rem] border border-[#e5e7eb] shadow-md"
        style={{ backgroundColor: design.shirtColor, aspectRatio: '4 / 5' }}
      >
        <div
          className="absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 rounded-b-full border border-[#e5e7eb]/40"
          style={{ backgroundColor: design.shirtColor, filter: 'brightness(0.92)' }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-16 h-10 w-28 -translate-x-1/2 rounded-b-3xl"
          style={{ backgroundColor: design.shirtColor, filter: 'brightness(0.88)' }}
          aria-hidden="true"
        />

        <div
          data-tshirt-canvas
          className="absolute overflow-hidden rounded border border-dashed border-[#9ca3af]/60 bg-white/10"
          style={{
            top: `${printArea.top}%`,
            left: `${printArea.left}%`,
            width: `${printArea.width}%`,
            height: `${printArea.height}%`,
          }}
        >
          {design.elements.map((element) => (
            <DraggableTshirtElement
              key={element.id}
              element={element}
              textColor={design.textColor}
              isSelected={selectedElementId === element.id}
              onSelect={onSelectElement}
              onMove={onMoveElement}
              onContentChange={onContentChange}
              onRemove={onRemoveElement}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#9ca3af]">
        Drag elements onto the print area or use arrow keys
      </p>
    </div>
  );
};

export default TshirtCanvas;