/**
 * TshirtCanvas.jsx — Shirt-shaped canvas with tab-specific editing modes.
 */

import { useState } from 'react';
import { FlipHorizontal2 } from 'lucide-react';
import {
  PRINT_AREA_BY_PLACEMENT,
  SHIRT_DESIGN_SURFACE,
  SHIRT_SHAPE_PATH,
  TSHIRT_PANEL,
} from './constants';
import { getViewElements } from './designModel';
import DraggableTshirtElement from './DraggableTshirtElement';

const MODE_HINTS = {
  [TSHIRT_PANEL.TEXT]: 'Tap a line to type, drag to move, corner handle to resize.',
  [TSHIRT_PANEL.COLOR]: 'Tap the shirt to pick a color, or use the swatches below.',
  [TSHIRT_PANEL.PRINT]: 'Choose front and back placement below.',
  [TSHIRT_PANEL.IMAGE]: 'Drag a file onto the shirt or upload a graphic.',
};

const isElementInteractive = (activeTab, element) => {
  if (activeTab === TSHIRT_PANEL.TEXT) {
    return element.type === 'text';
  }

  if (activeTab === TSHIRT_PANEL.IMAGE) {
    return element.type === 'image';
  }

  return false;
};

const TshirtCanvas = ({
  design,
  activeTab = TSHIRT_PANEL.TEXT,
  selectedElementId,
  previewLabel,
  onFlip,
  onDropFile,
  onShirtEyedropper,
  onSelectElement,
  onMoveElement,
  onResizeElement,
  onContentChange,
  onRemoveElement,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const activeView = design.activeView || 'front';
  const placementKey =
    activeView === 'back' ? design.backPrintPlacement : design.frontPrintPlacement;
  const placementGuide = PRINT_AREA_BY_PLACEMENT[placementKey] || PRINT_AREA_BY_PLACEMENT['front-chest'];
  const viewElements = getViewElements(design, activeView);
  const flipLabel = activeView === 'back' ? 'Show front' : 'Show back';
  const isImageMode = activeTab === TSHIRT_PANEL.IMAGE;
  const isColorMode = activeTab === TSHIRT_PANEL.COLOR;
  const isEditingMode = [TSHIRT_PANEL.TEXT, TSHIRT_PANEL.COLOR, TSHIRT_PANEL.PRINT, TSHIRT_PANEL.IMAGE].includes(
    activeTab
  );

  const handleDragOver = (event) => {
    if (!isImageMode || !onDropFile || !event.dataTransfer.types.includes('Files')) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event) => {
    if (!isImageMode) {
      return;
    }

    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file && onDropFile) {
      onDropFile(file);
    }
  };

  const handleShirtClick = () => {
    if (isColorMode && onShirtEyedropper) {
      onShirtEyedropper();
    }
  };

  return (
    <div className={`tshirt-canvas tshirt-canvas--mode-${activeTab}`}>
      <div className="tshirt-canvas__mockup-wrap">
        <div
          aria-label={previewLabel}
          className={`tshirt-canvas__stage tshirt-canvas__stage--${activeView}`}
        >
          <div
            className={`tshirt-canvas__shirt${
              isDragOver ? ' tshirt-canvas__shirt--drag-over' : ''
            }${isColorMode ? ' tshirt-canvas__shirt--color-mode' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <svg
              className={`tshirt-canvas__shape${
                isEditingMode ? ' tshirt-canvas__shape--editing' : ''
              }`}
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d={SHIRT_SHAPE_PATH}
                fill={design.shirtColor}
                stroke="none"
              />
              {isEditingMode && (
                <path
                  className="tshirt-canvas__outline"
                  d={SHIRT_SHAPE_PATH}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.45"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>

            {isColorMode && (
              <button
                type="button"
                className="tshirt-canvas__color-hit"
                onClick={handleShirtClick}
                aria-label="Pick shirt color with eyedropper"
              />
            )}

            {activeView === 'back' && (
              <span className="tshirt-canvas__view-label">Back</span>
            )}

            {isDragOver && (
              <span className="tshirt-canvas__drop-hint">Drop image on shirt</span>
            )}

            {activeTab === TSHIRT_PANEL.PRINT && (
              <div
                className="tshirt-canvas__placement-guide"
                style={{
                  top: `${placementGuide.top}%`,
                  left: `${placementGuide.left}%`,
                  width: `${placementGuide.width}%`,
                  height: `${placementGuide.height}%`,
                }}
                aria-hidden="true"
              />
            )}

            <div
              data-tshirt-canvas
              className="tshirt-canvas__design-surface"
              style={{
                top: `${SHIRT_DESIGN_SURFACE.top}%`,
                left: `${SHIRT_DESIGN_SURFACE.left}%`,
                width: `${SHIRT_DESIGN_SURFACE.width}%`,
                height: `${SHIRT_DESIGN_SURFACE.height}%`,
              }}
            >
              {viewElements.map((element) => (
                <DraggableTshirtElement
                  key={element.id}
                  element={element}
                  textColor={design.textColor}
                  isSelected={selectedElementId === element.id}
                  isInteractive={isElementInteractive(activeTab, element)}
                  onSelect={onSelectElement}
                  onMove={onMoveElement}
                  onResize={onResizeElement}
                  onContentChange={onContentChange}
                  onRemove={onRemoveElement}
                />
              ))}
            </div>
          </div>
        </div>

        {onFlip && (
          <button
            type="button"
            className="card-canvas__flip"
            onClick={onFlip}
            aria-label={`Flip shirt — ${flipLabel.toLowerCase()}`}
          >
            <FlipHorizontal2 size={16} aria-hidden="true" />
            <span>{flipLabel}</span>
          </button>
        )}
      </div>

      <p className="tshirt-canvas__hint">{MODE_HINTS[activeTab]}</p>
    </div>
  );
};

export default TshirtCanvas;