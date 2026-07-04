/**
 * ProductCard.jsx — Visual product tile for the landing-page grid.
 */

import { getProductImageUrl } from '../../constants/assets.constants';
import { formatPrice } from '../../utils/formatPrice';

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
    <button
      type="button"
      aria-expanded={isSelected}
      aria-controls={panelId}
      onClick={onSelect}
      className={`product-card group text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] ${
        isSelected ? 'product-card--selected' : ''
      }`}
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
        <p className="product-card__price">{formatPrice(price)}</p>
      </div>
    </button>
  );
};

export default ProductCard;