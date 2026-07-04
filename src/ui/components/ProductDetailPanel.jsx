/**
 * ProductDetailPanel.jsx — Expanded product specs and designer CTAs.
 */

import { X } from 'lucide-react';
import { getProductImageUrl } from '../../constants/assets.constants';
import { PRICING_HELPER_TEXT } from '../../constants/business.constants';
import { formatPrice } from '../../utils/formatPrice';
import Button from './primitives/Button';

const ProductDetailPanel = ({
  productId,
  product,
  price,
  onClose,
  onDesignerOpen,
}) => {
  const imageUrl = getProductImageUrl(productId, product);
  const panelId = `product-panel-${productId}`;
  const headerId = `product-header-${productId}`;
  const specs = product?.specs || [];

  return (
    <article
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      className="product-detail-panel"
    >
      <div className="product-detail-panel__header">
        <h3 id={headerId} className="product-detail-panel__heading">
          {product?.name}
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${product?.name} details`}
          className="product-detail-panel__close"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="product-detail-panel__content">
        {imageUrl && (
          <div className="product-detail-panel__media">
            <img
              src={imageUrl}
              alt={product?.name}
              className="product-detail-panel__image"
            />
          </div>
        )}

        <div className="product-detail-panel__info">
          {product?.description && (
            <p className="product-detail-panel__description">{product.description}</p>
          )}

          {specs.length > 0 && (
            <table className="product-detail-panel__specs">
              <tbody>
                {specs.map((spec) => (
                  <tr key={`${spec.label}-${spec.value}`}>
                    <th scope="row">{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {product?.minQuantity && (
            <p className="product-detail-panel__minimum">
              Minimum order: {product.minQuantity}
            </p>
          )}

          <div className="product-detail-panel__actions">
            <div>
              <p className="product-detail-panel__price text-[var(--color-text-disabled)]">
                {formatPrice(price)}
              </p>
              <p className="product-detail-panel__price-note">{PRICING_HELPER_TEXT}</p>
            </div>

            <div className="product-detail-panel__buttons">
              <Button onClick={() => onDesignerOpen(productId, 'add')}>Add to order</Button>
              <Button variant="secondary" onClick={() => onDesignerOpen(productId, 'edit')}>
                Edit design
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetailPanel;