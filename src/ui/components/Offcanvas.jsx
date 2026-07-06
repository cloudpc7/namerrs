/**
 * Offcanvas.jsx — Right-sliding panel with backdrop, focus trap, and motion support.
 */

import { useEffect, useId, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { PanelHeader } from './primitives';

const Offcanvas = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const panelRef = useRef(null);
  const titleId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();

  useFocusTrap(isOpen, panelRef, onClose);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const backdropSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    immediate: prefersReducedMotion,
  });

  const panelSpring = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
    immediate: prefersReducedMotion,
  });

  if (!isOpen && prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`offcanvas-host${isOpen ? '' : ' offcanvas-host--closed'}`}
      aria-hidden={!isOpen}
    >
      <animated.button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        style={backdropSpring}
        className="offcanvas-host__backdrop"
        tabIndex={isOpen ? 0 : -1}
      />

      <animated.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={panelSpring}
        className="offcanvas-host__panel"
      >
        <PanelHeader title={title} titleId={titleId} onClose={onClose} closeLabel="Close panel" />
        <div className="offcanvas-host__body">{children}</div>
      </animated.div>
    </div>
  );
};

export default Offcanvas;