/**
 * DraggableCardElement.jsx — Draggable text or image element on the card canvas.
 */

import { useRef } from 'react';
import { TEXT_FIELDS } from './constants';

const DraggableCardElement = ({
  element,
  sideState,
  isSelected,
  onSelect,
  onMove,
  onContentChange,
  onRemove,
}) => {
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const startDrag = (clientX, clientY) => {
    dragRef.current = {
      dragging: true,
      startX: clientX,
      startY: clientY,
      originX: element.x,
      originY: element.y,
    };
    onSelect(element.id);
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    startDrag(event.clientX, event.clientY);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.dragging) {
      return;
    }

    const canvas = event.currentTarget.closest('[data-card-canvas]');
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const deltaX = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
    const deltaY = ((event.clientY - dragRef.current.startY) / rect.height) * 100;

    onMove(element.id, dragRef.current.originX + deltaX, dragRef.current.originY + deltaY);
  };

  const handlePointerUp = (event) => {
    dragRef.current.dragging = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 5 : 1;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onMove(element.id, element.x - step, element.y);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      onMove(element.id, element.x + step, element.y);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      onMove(element.id, element.x, element.y - step);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      onMove(element.id, element.x, element.y + step);
    }
  };

  const field = TEXT_FIELDS.find((item) => item.key === element.fieldKey);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={element.type === 'text' ? field?.label || 'Text field' : 'Image'}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      onFocus={() => onSelect(element.id)}
      className={`absolute cursor-move rounded border px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-[#93c5fd] ${
        isSelected ? 'border-[#1d4ed8] ring-1 ring-[#93c5fd]' : 'border-transparent'
      }`}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.width}%`,
        minHeight: `${element.height}%`,
        color: sideState.textColor,
        fontSize: `${element.fontSize || 12}px`,
      }}
    >
      {element.type === 'text' ? (
        <input
          type="text"
          value={element.content}
          placeholder={field?.placeholder || ''}
          onChange={(event) => onContentChange(element.id, event.target.value)}
          onClick={(event) => event.stopPropagation()}
          className="w-full border-0 bg-transparent p-0 text-inherit outline-none"
          style={{ fontSize: 'inherit', color: 'inherit' }}
        />
      ) : (
        <img
          src={element.src}
          alt={element.fileName || 'Uploaded graphic'}
          className="h-full w-full object-cover"
          draggable={false}
        />
      )}

      {isSelected && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove(element.id);
          }}
          className="absolute -right-2 -top-2 rounded-full bg-[#dc2626] px-1.5 text-[10px] text-white"
          aria-label="Remove element"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DraggableCardElement;