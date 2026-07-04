/**
 * SectionHeading.jsx — Eyebrow, title, and optional subtitle for page sections.
 */

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
  className = '',
}) => {
  const alignClass = align === 'center' ? 'section-heading--center' : '';

  return (
    <div className={`section-heading ${alignClass} ${className}`.trim()}>
      {eyebrow && (
        <p className={`section-heading__eyebrow${dark ? ' section-heading__eyebrow--dark' : ''}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`section-heading__title${dark ? ' section-heading__title--dark' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-heading__subtitle${dark ? ' section-heading__subtitle--dark' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;