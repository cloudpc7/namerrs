/**
 * ProductsSection.jsx — Landing-page product grid with expandable detail panel.
 */

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectAllProducts,
  selectContentStatus,
  selectPricing,
} from '../../redux/slices/content.slice';
import { selectProductSearch } from '../../redux/slices/ui.slice';
import { CONTENT_STATUS } from '../../redux/constants/content.constants';
import { PRODUCT_ORDER } from '../../constants/products.constants';
import { PRICING_HELPER_TEXT } from '../../constants/business.constants';
import Section from './primitives/Section';
import SectionHeading from './primitives/SectionHeading';
import ProductCard from './ProductCard';
import ProductDetailPanel from './ProductDetailPanel';

const ProductsSection = ({ onDesignerOpen = () => {} }) => {
  const status = useSelector(selectContentStatus);
  const products = useSelector(selectAllProducts);
  const pricing = useSelector(selectPricing);
  const searchQuery = useSelector(selectProductSearch);
  const [openProductId, setOpenProductId] = useState(null);

  const visibleProducts = useMemo(() => {
    const ordered = PRODUCT_ORDER.filter((productId) => products[productId]);
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return ordered;
    }

    return ordered.filter((productId) => {
      const product = products[productId];
      const haystack = [
        product?.name,
        product?.description,
        ...(product?.specs || []).flatMap((spec) => [spec.label, spec.value]),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [products, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() && visibleProducts.length === 1) {
      setOpenProductId(visibleProducts[0]);
    }
  }, [searchQuery, visibleProducts]);

  const handleSelect = (productId) => {
    setOpenProductId((current) => (current === productId ? null : productId));
  };

  if (status === CONTENT_STATUS.LOADING) {
    return (
      <Section id="products" ariaLabel="Loading products" variant="surface">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-[var(--color-border)]" />
          <div className="product-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={`product-skeleton-${index}`} className="h-64 rounded-2xl bg-[var(--color-border)]" />
            ))}
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="products" ariaLabel="Products" variant="surface">
      <SectionHeading
        eyebrow="Products & services"
        title="Customize your order"
        subtitle="Choose a product below to view specs, then add or edit your design in the offcanvas designer."
      />

      <p className="mt-4 text-sm text-[var(--color-text-disabled)]">{PRICING_HELPER_TEXT}</p>

      {searchQuery.trim() && (
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]" role="status">
          {visibleProducts.length
            ? `Showing ${visibleProducts.length} product${visibleProducts.length === 1 ? '' : 's'} matching “${searchQuery.trim()}”.`
            : `No products match “${searchQuery.trim()}”. Try business cards, shirts, or banners.`}
        </p>
      )}

      <div className="product-grid mt-8">
        {visibleProducts.map((productId) => (
          <ProductCard
            key={productId}
            productId={productId}
            product={products[productId]}
            price={pricing[productId] ?? 0}
            isSelected={openProductId === productId}
            onSelect={() => handleSelect(productId)}
          />
        ))}
      </div>

      {openProductId && products[openProductId] && (
        <ProductDetailPanel
          productId={openProductId}
          product={products[openProductId]}
          price={pricing[openProductId] ?? 0}
          onClose={() => setOpenProductId(null)}
          onDesignerOpen={onDesignerOpen}
        />
      )}
    </Section>
  );
};

export default ProductsSection;