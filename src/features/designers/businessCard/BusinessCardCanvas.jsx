/**
 * BusinessCardCanvas.jsx — 3.5 × 2 in interactive card with front/back flip.
 */

import { FlipHorizontal2 } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { CARD_ASPECT_RATIO } from './constants';
import DraggableCardElement from './DraggableCardElement';

const CardFace = ({
  sideState,
  selectedElementId,
  isActive,
  onSelectElement,
  onMoveElement,
  onResizeElement,
  onContentChange,
  onRemoveElement,
  rotateY = 0,
}) => (
  <div
    data-card-canvas
    className="card-canvas__face absolute inset-0 overflow-hidden"
    style={{
      backfaceVisibility: 'hidden',
      transform: `rotateY(${rotateY}deg)`,
      backgroundColor: sideState.backgroundColor,
      pointerEvents: isActive ? 'auto' : 'none',
    }}
  >
    {isActive &&
      sideState.elements.map((element) => (
        <DraggableCardElement
          key={element.id}
          element={element}
          sideState={sideState}
          isSelected={selectedElementId === element.id}
          onSelect={onSelectElement}
          onMove={onMoveElement}
          onResize={onResizeElement}
          onContentChange={onContentChange}
          onRemove={onRemoveElement}
        />
      ))}
  </div>
);

const BusinessCardCanvas = ({
  design,
  frontState,
  backState,
  selectedElementId,
  previewLabel,
  onFlip,
  onSelectElement,
  onMoveElement,
  onResizeElement,
  onContentChange,
  onRemoveElement,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isBack = design.activeSide === 'back';
  const flipLabel = isBack ? 'Show front' : 'Show back';

  const flipSpring = useSpring({
    transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
    immediate: prefersReducedMotion,
    config: { tension: 220, friction: 24 },
  });

  return (
    <div className="card-canvas">
      <div className="card-canvas__card-wrap">
        <animated.div
          aria-label={previewLabel}
          className="card-canvas__card"
          style={{
            ...flipSpring,
            aspectRatio: CARD_ASPECT_RATIO,
            transformStyle: 'preserve-3d',
          }}
        >
          <CardFace
            sideState={frontState}
            selectedElementId={selectedElementId}
            isActive={!isBack}
            onSelectElement={onSelectElement}
            onMoveElement={onMoveElement}
            onResizeElement={onResizeElement}
            onContentChange={onContentChange}
            onRemoveElement={onRemoveElement}
          />
          <CardFace
            sideState={backState}
            selectedElementId={selectedElementId}
            isActive={isBack}
            onSelectElement={onSelectElement}
            onMoveElement={onMoveElement}
            onResizeElement={onResizeElement}
            onContentChange={onContentChange}
            onRemoveElement={onRemoveElement}
            rotateY={180}
          />
        </animated.div>

        {onFlip && (
          <button
            type="button"
            className="card-canvas__flip"
            onClick={onFlip}
            aria-label={`Flip card — ${flipLabel.toLowerCase()}`}
          >
            <FlipHorizontal2 size={16} aria-hidden="true" />
            <span>{flipLabel}</span>
          </button>
        )}
      </div>
      <p className="card-canvas__hint">
        US standard 3.5 × 2 in — drag the grip to move, drag the corner to resize
      </p>
    </div>
  );
};

export default BusinessCardCanvas;