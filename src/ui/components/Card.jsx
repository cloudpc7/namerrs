import { Card } from 'react-bootstrap';

const ReusableCard = ({
  children,
  title,
  subtitle,
  header,
  footer,
  imgSrc,
  imgAlt = "",
  imgTop = true,
  variant,
  className = "",
  bodyClassName = "",
  ...props
}) => {
  return (
    <Card className={className} {...props}>
      {/* Header */}
      {(header || title) && (
        <Card.Header>
          {header ? (
            header
          ) : (
            <>
              {title && <Card.Title>{title}</Card.Title>}
              {subtitle && <Card.Subtitle className="text-muted">{subtitle}</Card.Subtitle>}
            </>
          )}
        </Card.Header>
      )}

      {/* Image Top */}
      {imgSrc && imgTop && (
        <Card.Img variant="top" src={imgSrc} alt={imgAlt} />
      )}

      {/* Body */}
      <Card.Body className={bodyClassName}>
        {children}
      </Card.Body>

      {/* Image Bottom */}
      {imgSrc && !imgTop && (
        <Card.Img variant="bottom" src={imgSrc} alt={imgAlt} />
      )}

      {/* Footer */}
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
};

export default ReusableCard;