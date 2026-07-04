/**
 * MediaFrame.jsx — Consistent image frame with aspect ratio and elevation.
 */

const MediaFrame = ({
  src,
  alt,
  aspectRatio = '4 / 3',
  loading = 'lazy',
  className = '',
}) => (
  <div className={`media-frame ${className}`.trim()}>
    <img
      src={src}
      alt={alt}
      loading={loading}
      className="media-frame__image"
      style={{ aspectRatio }}
    />
  </div>
);

export default MediaFrame;