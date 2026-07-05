/**
 * ProductsSection.jsx — Landing-page product grid with modal detail panel.
 */

import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllProducts,
  selectContentStatus,
} from '../../redux/slices/content.slice';
import { clearProductSearch, selectProductSearch } from '../../redux/slices/ui.slice';
import {
  closeProductDetail,
  openProductDetail,
  selectIsProductDetailOpen,
  selectProductDetailId,
} from '../../redux/slices/productDetail.slice';
import { CONTENT_STATUS } from '../../redux/constants/content.constants';
import { PRODUCT_ORDER } from '../../constants/products.constants';
import { Button, Section, SectionHeading, Skeleton, Stack } from './primitives';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectContentStatus);
  const products = useSelector(selectAllProducts);
  const searchQuery = useSelector(selectProductSearch);
  const isDetailOpen = useSelector(selectIsProductDetailOpen);
  const openProductId = useSelector(selectProductDetailId);

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

  const handleClearSearch = () => {
    dispatch(clearProductSearch());
    dispatch(closeProductDetail());
  };

  const handleSelect = (productId) => {
    if (isDetailOpen && openProductId === productId) {
      dispatch(closeProductDetail());
      return;
    }

    dispatch(
      openProductDetail({
        productId,
        product: products[productId],
      })
    );
  };

  if (status === CONTENT_STATUS.LOADING) {
    return (
      <Section id="products" ariaLabel="Loading products" variant="surface" className="products-section">
        <Stack gap="lg" className="animate-pulse">
          <Skeleton variant="title" style={{ width: '12rem' }} />
          <div className="product-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={`product-skeleton-${index}`} variant="block" style={{ height: '16rem' }} />
            ))}
          </div>
        </Stack>
      </Section>
    );
  }

  return (
    <Section id="products" ariaLabel="Products" variant="surface" className="products-section">
      <SectionHeading
        className="products-section__heading"
        eyebrow="Products & services"
        title="Customize your order"
        subtitle={[
          'Choose a product below to view specs.',
          'Then open the designer to add or edit your order.',
        ]}
      />

      {searchQuery.trim() && (
        <div className="product-search-status" role="status" aria-live="polite">
          <p className="product-search-status__message">
            {visibleProducts.length
              ? `Showing ${visibleProducts.length} product${visibleProducts.length === 1 ? '' : 's'} matching “${searchQuery.trim()}”.`
              : `No products match “${searchQuery.trim()}”. Try business cards, shirts, or banners.`}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="product-search-status__clear"
            onClick={handleClearSearch}
          >
            Clear search
          </Button>
        </div>
      )}

      <div className="product-grid">
        {visibleProducts.map((productId) => (
          <ProductCard
            key={productId}
            productId={productId}
            product={products[productId]}
            isSelected={openProductId === productId}
            onSelect={() => handleSelect(productId)}
          />
        ))}
      </div>
    </Section>
  );
};

export default ProductsSection;