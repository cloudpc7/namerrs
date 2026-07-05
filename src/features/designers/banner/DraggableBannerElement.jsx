/**
 * DraggableBannerElement.jsx — Draggable, resizable image on banner canvas.
 */

import { useRef } from 'react';
import { GripVertical } from 'lucide-react';

const DraggableBannerElement = ({
  element,
  isSelected,
  onSelect,
  onMove,
  onResize,
  onRemove,
}) => {
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const resizeRef = useRef({
    resizing: false,
    startX: 0,
    startY: 0,
    originWidth: 0,
    originHeight: 0,
  });

  const getCanvas = (node) => node?.closest('[data-banner-canvas]');

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

  const handleDragPointerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    startDrag(event.clientX, event.clientY);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleDragPointerMove = (event) => {
    if (!dragRef.current.dragging) {
      return;
    }

    const canvas = getCanvas(event.currentTarget);
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const deltaX = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
    const deltaY = ((event.clientY - dragRef.current.startY) / rect.height) * 100;

    onMove(element.id, dragRef.current.originX + deltaX, dragRef.current.originY + deltaY);
  };

  const handleDragPointerUp = (event) => {
    dragRef.current.dragging = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleImagePointerDown = (event) => {
    if (event.target.closest('.card-element__resize, .card-element__remove, .card-element__drag')) {
      return;
    }

    event.preventDefault();
    startDrag(event.clientX, event.clientY);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleImagePointerMove = (event) => {
    if (!dragRef.current.dragging) {
      return;
    }

    const canvas = getCanvas(event.currentTarget);
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const deltaX = ((event.clientX - dragRef.current.startX) / rect.width) * 100;
    const deltaY = ((event.clientY - dragRef.current.startY) / rect.height) * 100;

    onMove(element.id, dragRef.current.originX + deltaX, dragRef.current.originY + deltaY);
  };

  const handleImagePointerUp = (event) => {
    dragRef.current.dragging = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleResizePointerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    resizeRef.current = {
      resizing: true,
      startX: event.clientX,
      startY: event.clientY,
      originWidth: element.width,
      originHeight: element.height,
    };
    onSelect(element.id);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleResizePointerMove = (event) => {
    if (!resizeRef.current.resizing || !onResize) {
      return;
    }

    const canvas = getCanvas(event.currentTarget);
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const deltaX = ((event.clientX - resizeRef.current.startX) / rect.width) * 100;
    const deltaY = ((event.clientY - resizeRef.current.startY) / rect.height) * 100;

    onResize(
      element.id,
      resizeRef.current.originWidth + deltaX,
      resizeRef.current.originHeight + deltaY
    );
  };

  const handleResizePointerUp = (event) => {
    resizeRef.current.resizing = false;
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
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      onRemove(element.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`card-element card-element--image${
        isSelected ? ' card-element--selected' : ''
      }`}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.width}%`,
        height: `${element.height}%`,
      }}
      onPointerDown={handleImagePointerDown}
      onPointerMove={handleImagePointerMove}
      onPointerUp={handleImagePointerUp}
      onClick={() => onSelect(element.id)}
      onContextMenu={(event) => {
        event.preventDefault();
        onSelect(element.id);
      }}
      onKeyDown={handleKeyDown}
      onFocus={() => onSelect(element.id)}
      aria-label={element.fileName || 'Banner image'}
    >
      <button
        type="button"
        className="card-element__drag"
        aria-label={`Drag ${element.fileName || 'image'}`}
        onPointerDown={handleDragPointerDown}
        onPointerMove={handleDragPointerMove}
        onPointerUp={handleDragPointerUp}
      >
        <GripVertical size={14} aria-hidden="true" />
      </button>

      <img
        src={element.src}
        alt={element.fileName || 'Banner artwork'}
        className="card-element__image"
        style={{ objectFit: element.objectFit || 'contain' }}
        draggable={false}
      />

      {isSelected && (
        <>
          {onResize && (
            <button
              type="button"
              className="card-element__resize"
              aria-label={`Resize ${element.fileName || 'image'}`}
              onPointerDown={handleResizePointerDown}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
            />
          )}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(element.id);
            }}
            className="card-element__remove"
            aria-label="Remove image"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default DraggableBannerElement;