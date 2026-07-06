/**
 * Section.jsx — Consistent landing-page section wrapper with background variants.
 */

const VARIANTS = {
  white: 'section--white',
  surface: 'section--surface',
  dark: 'section--dark',
};

const Section = ({
  id,
  ariaLabel,
  ariaBusy = false,
  variant = 'white',
  className = '',
  containerClassName = '',
  children,
}) => (
  <section
    id={id}
    aria-label={ariaLabel}
    aria-busy={ariaBusy || undefined}
    className={`section ${VARIANTS[variant] || VARIANTS.white} ${className}`.trim()}
  >
    <div className={`section__container ${containerClassName}`.trim()}>{children}</div>
  </section>
);

export default Section;