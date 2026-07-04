/**
 * BusinessCardCanvas.jsx — 3.5 × 2 in interactive card with front/back flip.
 */

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
  onContentChange,
  onRemoveElement,
  rotateY = 0,
}) => (
  <div
    data-card-canvas
    className="absolute inset-0 overflow-hidden rounded-lg border border-[#e5e7eb]"
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
  onSelectElement,
  onMoveElement,
  onContentChange,
  onRemoveElement,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isBack = design.activeSide === 'back';

  const flipSpring = useSpring({
    transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
    immediate: prefersReducedMotion,
    config: { tension: 220, friction: 24 },
  });

  return (
    <div className="perspective-[1000px]">
      <animated.div
        aria-label={previewLabel}
        className="relative mx-auto w-full max-w-md rounded-lg shadow-md"
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
          onContentChange={onContentChange}
          onRemoveElement={onRemoveElement}
        />
        <CardFace
          sideState={backState}
          selectedElementId={selectedElementId}
          isActive={isBack}
          onSelectElement={onSelectElement}
          onMoveElement={onMoveElement}
          onContentChange={onContentChange}
          onRemoveElement={onRemoveElement}
          rotateY={180}
        />
      </animated.div>
      <p className="mt-2 text-center text-xs text-[#9ca3af]">
        US standard 3.5 × 2 in — drag elements or use arrow keys
      </p>
    </div>
  );
};

export default BusinessCardCanvas;