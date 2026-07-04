/**
 * DraggableCardElement.jsx — Text or image element with a dedicated drag handle.
 */

import { useRef } from 'react';
import { GripVertical } from 'lucide-react';
import { TEXT_FIELDS } from './constants';

const DraggableCardElement = ({
  element,
  sideState,
  isSelected,
  onSelect,
  onMove,
  onResize,
  onContentChange,
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
    if (!resizeRef.current.resizing) {
      return;
    }

    const canvas = event.currentTarget.closest('[data-card-canvas]');
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
    }
  };

  const field = TEXT_FIELDS.find((item) => item.key === element.fieldKey);

  return (
    <div
      className={`card-element${isSelected ? ' card-element--selected' : ''}`}
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        width: `${element.width}%`,
        height: `${element.height}%`,
        color: sideState.textColor,
        fontSize: `${element.fontSize || 12}px`,
      }}
      onFocus={() => onSelect(element.id)}
    >
      <button
        type="button"
        className="card-element__drag"
        aria-label={`Drag ${field?.label || 'element'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <GripVertical size={14} aria-hidden="true" />
      </button>

      {element.type === 'text' ? (
        <input
          type="text"
          value={element.content}
          placeholder={field?.placeholder || ''}
          onChange={(event) => onContentChange(element.id, event.target.value)}
          onFocus={() => onSelect(element.id)}
          className="card-element__input"
          style={{ fontSize: 'inherit', color: 'inherit' }}
        />
      ) : (
        <img
          src={element.src}
          alt={element.fileName || 'Uploaded graphic'}
          className="card-element__image"
          draggable={false}
        />
      )}

      {isSelected && (
        <>
          <button
            type="button"
            className="card-element__resize"
            aria-label={`Resize ${field?.label || 'element'}`}
            onPointerDown={handleResizePointerDown}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
          />
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(element.id);
            }}
            className="card-element__remove"
            aria-label="Remove element"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default DraggableCardElement;