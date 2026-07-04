/**
 * DraggableBannerElement.jsx — Draggable image on banner canvas.
 */

import { useRef } from 'react';

const DraggableBannerElement = ({
  element,
  isSelected,
  onSelect,
  onMove,
  onRemove,
}) => {
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const handlePointerDown = (event) => {
    event.preventDefault();
    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: element.x,
      originY: element.y,
    };
    onSelect(element.id);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.dragging) return;
    const canvas = event.currentTarget.closest('[data-banner-canvas]');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const deltaX = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
    const deltaY = ((event.clientY - dragRef.current.startY) / rect.height) * 100;
    onMove(element.id, dragRef.current.originX + deltaX, dragRef.current.originY + deltaY);
  };

  const handlePointerUp = (event) => {
    dragRef.current.dragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
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

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Banner image"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      onFocus={() => onSelect(element.id)}
      className={`absolute cursor-move rounded border focus:outline-none focus:ring-2 focus:ring-[#93c5fd] ${
        isSelected ? 'border-[#1d4ed8] ring-1 ring-[#93c5fd]' : 'border-transparent'
      }`}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.width}%`,
        height: `${element.height}%`,
      }}
    >
      <img
        src={element.src}
        alt={element.fileName || 'Banner artwork'}
        className="h-full w-full object-cover"
        draggable={false}
      />
      {isSelected && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(element.id);
          }}
          className="absolute -right-2 -top-2 rounded-full bg-[#dc2626] px-1.5 text-[10px] text-white"
          aria-label="Remove image"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DraggableBannerElement;