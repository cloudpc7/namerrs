/**
 * Offcanvas.jsx — Right-sliding panel with backdrop, focus trap, and motion support.
 */

import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const Offcanvas = ({
  isOpen,
  onClose,
  title,
  ariaLabel,
  children,
}) => {
  const panelRef = useRef(null);
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
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <animated.button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        style={backdropSpring}
        className="absolute inset-0 bg-black/40"
        tabIndex={isOpen ? 0 : -1}
      />

      <animated.aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        style={panelSpring}
        className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text-primary)] transition-colors hover:bg-white hover:text-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </animated.aside>
    </div>
  );
};

export default Offcanvas;