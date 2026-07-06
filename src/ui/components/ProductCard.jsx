/**
 * ProductCard.jsx — Visual product tile for the landing-page grid.
 */

import { getProductImageUrl } from '../../constants/assets.constants';
import { getProductDescriptionLines } from '../../utils/productDescription';
import { PRODUCT_DETAIL_MODAL_ID } from './ProductDetailModal';
import { Card } from './primitives';

const ProductCard = ({
  productId,
  product,
  isSelected,
  onSelect,
}) => {
  const imageUrl = getProductImageUrl(productId, product);
  const panelId = PRODUCT_DETAIL_MODAL_ID;
  const descriptionLines = getProductDescriptionLines(product?.description);

  return (
    <Card
      as="button"
      type="button"
      variant={isSelected ? 'selected' : 'interactive'}
      className="product-card"
      data-testid={`product-card-${productId}`}
      aria-expanded={isSelected}
      aria-controls={panelId}
      onClick={onSelect}
    >
      <div className="product-card__media">
        {imageUrl ? (
          <img src={imageUrl} alt={product?.name || 'Product'} className="product-card__image" />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product?.name}</h3>
        {descriptionLines.length > 1 ? (
          <p className="product-card__desc">
            {descriptionLines.map((line) => (
              <span key={line} className="product-card__desc-line">
                {line}
              </span>
            ))}
          </p>
        ) : (
          descriptionLines[0] && (
            <p className="product-card__desc product-card__desc--clamped">
              {descriptionLines[0]}
            </p>
          )
        )}
      </div>
    </Card>
  );
};

export default ProductCard;