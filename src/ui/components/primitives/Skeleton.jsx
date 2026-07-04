/**
 * Skeleton.jsx — Loading placeholder blocks.
 */

const VARIANTS = {
  text: 'skeleton--text',
  title: 'skeleton--title',
  block: 'skeleton--block',
};

const Skeleton = ({ variant = 'text', className = '', style }) => (
  <div
    className={`skeleton ${VARIANTS[variant] || VARIANTS.text} ${className}`.trim()}
    style={style}
    aria-hidden="true"
  />
);

export default Skeleton;