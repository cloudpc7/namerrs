/**
 * ProductDetailPanel.jsx — Expanded product specs and designer CTAs.
 */

import { X } from 'lucide-react';
import { getProductImageUrl } from '../../constants/assets.constants';
import {
  Button,
  Card,
  IconButton,
  MediaFrame,
  PriceDisplay,
  SpecTable,
  Surface,
  Stack,
} from './primitives';

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

  return (
    <Card
      as="article"
      id={panelId}
      role="region"
      aria-labelledby={headerId}
      variant="elevated"
      className="product-detail-panel"
    >
      <div className="product-detail-panel__header">
        <h3 id={headerId} className="product-detail-panel__heading">
          {product?.name}
        </h3>
        <IconButton label={`Close ${product?.name} details`} onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </IconButton>
      </div>

      <div className="product-detail-panel__content">
        {imageUrl && (
          <MediaFrame src={imageUrl} alt={product?.name} className="product-detail-panel__media" />
        )}

        <Stack gap="md" className="product-detail-panel__info">
          {product?.description && (
            <p className="product-detail-panel__description">{product.description}</p>
          )}

          <SpecTable specs={product?.specs || []} />

          {product?.minQuantity && (
            <p className="product-detail-panel__minimum">
              Minimum order: {product.minQuantity}
            </p>
          )}

          <Surface padding="md" className="product-detail-panel__actions">
            <PriceDisplay amount={price} size="lg" showHelper />
            <div className="cluster product-detail-panel__buttons">
              <Button onClick={() => onDesignerOpen(productId, 'add', product?.minQuantity)}>
                Add to order
              </Button>
              <Button
                variant="secondary"
                onClick={() => onDesignerOpen(productId, 'edit', product?.minQuantity)}
              >
                Edit design
              </Button>
            </div>
          </Surface>
        </Stack>
      </div>
    </Card>
  );
};

export default ProductDetailPanel;