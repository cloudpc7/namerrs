/**
 * ProductAccordionItem.jsx — Single expandable product panel with specs and CTAs.
 */

import { useSpring, animated } from '@react-spring/web';
import { ChevronDown } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { getProductImageUrl } from '../../constants/assets.constants';

import { formatPrice } from '../../utils/formatPrice';
import Button from './primitives/Button';

const ProductAccordionItem = ({
  productId,
  product,
  price,
  isOpen,
  isHighlighted = false,
  onToggle,
  onDesignerOpen,
}) => {
  const imageUrl = getProductImageUrl(productId, product);
  const panelId = `product-panel-${productId}`;
  const headerId = `product-header-${productId}`;
  const specs = product?.specs || [];
  const prefersReducedMotion = usePrefersReducedMotion();

  const springStyles = useSpring({
    maxHeight: isOpen ? 1200 : 0,
    opacity: isOpen ? 1 : 0,
    config: { tension: 280, friction: 28 },
    immediate: prefersReducedMotion,
  });

  return (
    <article
      className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 transition-shadow hover:shadow-md ${
        isHighlighted
          ? 'ring-[var(--color-accent)]'
          : 'ring-[var(--color-border)]'
      }`}
    >
      <h3 className="m-0">
        <button
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-focus-ring)] sm:px-5"
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="product-thumb"
            />
          )}

          <span className="min-w-0 flex-1">
            <span className="block text-lg font-semibold text-[var(--color-text-primary)]">
              {product?.name}
            </span>
            {!isOpen && product?.description && (
              <span className="mt-1 block truncate text-sm text-[var(--color-text-secondary)]">
                {product.description}
              </span>
            )}
          </span>

          <span className="hidden text-sm font-semibold text-[var(--color-text-disabled)] sm:block">
            {formatPrice(price)}
          </span>

          <ChevronDown
            size={20}
            aria-hidden="true"
            className={`shrink-0 text-[var(--color-text-secondary)] transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h3>

      <animated.div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        style={springStyles}
        className="overflow-hidden"
      >
        <div className="space-y-5 border-t border-[var(--color-border)] px-4 py-5 sm:px-5">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={product?.name}
              className="product-expanded-image"
            />
          )}

          {product?.description && (
            <p className="text-[var(--color-text-secondary)]">{product.description}</p>
          )}

          {specs.length > 0 && (
            <table className="w-full overflow-hidden rounded-xl text-sm ring-1 ring-[var(--color-border)]">
              <tbody>
                {specs.map((spec) => (
                  <tr
                    key={`${spec.label}-${spec.value}`}
                    className="border-b border-[var(--color-border)] last:border-0"
                  >
                    <th
                      scope="row"
                      className="bg-[var(--color-surface)] px-4 py-3 text-left font-medium text-[var(--color-text-primary)]"
                    >
                      {spec.label}
                    </th>
                    <td className="px-4 py-3 text-[var(--color-text-secondary)]">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {product?.minQuantity && (
            <p className="text-sm text-[var(--color-text-secondary)]">
              Minimum order: {product.minQuantity}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[var(--color-surface)] p-4">
            <div>
              <p className="text-lg font-semibold text-[var(--color-text-disabled)]">
                {formatPrice(price)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => onDesignerOpen(productId, 'add')}>Add to order</Button>
            </div>
          </div>
        </div>
      </animated.div>
    </article>
  );
};

export default ProductAccordionItem;