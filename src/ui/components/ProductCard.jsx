/**
 * ProductCard.jsx — Visual product tile for the landing-page grid.
 */

import { getProductImageUrl } from '../../constants/assets.constants';
import { Card, PriceDisplay } from './primitives';

const ProductCard = ({
  productId,
  product,
  price,
  isSelected,
  onSelect,
}) => {
  const imageUrl = getProductImageUrl(productId, product);
  const panelId = `product-panel-${productId}`;

  return (
    <Card
      as="button"
      type="button"
      variant={isSelected ? 'selected' : 'interactive'}
      className="product-card"
      aria-expanded={isSelected}
      aria-controls={panelId}
      onClick={onSelect}
    >
      <div className="product-card__media">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="product-card__image" />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product?.name}</h3>
        {product?.description && (
          <p className="product-card__desc">{product.description}</p>
        )}
        <PriceDisplay amount={price} />
      </div>
    </Card>
  );
};

export default ProductCard;