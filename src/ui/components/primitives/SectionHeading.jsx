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
  const subtitleClass = `section-heading__subtitle${dark ? ' section-heading__subtitle--dark' : ''}`;

  const renderSubtitle = () => {
    if (!subtitle) {
      return null;
    }

    if (Array.isArray(subtitle)) {
      return (
        <div className="section-heading__subtitle-group">
          {subtitle.map((line) => (
            <p key={line} className={subtitleClass}>
              {line}
            </p>
          ))}
        </div>
      );
    }

    return <p className={subtitleClass}>{subtitle}</p>;
  };

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
      {renderSubtitle()}
    </div>
  );
};

export default SectionHeading;