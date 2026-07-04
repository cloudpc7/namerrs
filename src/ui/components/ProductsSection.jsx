/**
 * ProductsSection.jsx — Landing-page product grid with modal detail panel.
 */

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllProducts,
  selectContentStatus,
  selectPricing,
} from '../../redux/slices/content.slice';
import { selectProductSearch } from '../../redux/slices/ui.slice';
import {
  closeProductDetail,
  openProductDetail,
  selectIsProductDetailOpen,
  selectProductDetailId,
} from '../../redux/slices/productDetail.slice';
import { CONTENT_STATUS } from '../../redux/constants/content.constants';
import { PRODUCT_ORDER } from '../../constants/products.constants';
import { PRICING_HELPER_TEXT } from '../../constants/business.constants';
import { Section, SectionHeading, Skeleton, Alert, Stack } from './primitives';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectContentStatus);
  const products = useSelector(selectAllProducts);
  const pricing = useSelector(selectPricing);
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

  useEffect(() => {
    if (searchQuery.trim() && visibleProducts.length === 1) {
      const productId = visibleProducts[0];
      dispatch(
        openProductDetail({
          productId,
          product: products[productId],
        })
      );
    }
  }, [dispatch, products, searchQuery, visibleProducts]);

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
      <Section id="products" ariaLabel="Loading products" variant="surface">
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
    <Section id="products" ariaLabel="Products" variant="surface">
      <SectionHeading
        eyebrow="Products & services"
        title="Customize your order"
        subtitle="Choose a product below to view specs, then add or edit your design in the offcanvas designer."
      />

      <Alert variant="info" className="mt-4">
        {PRICING_HELPER_TEXT}
      </Alert>

      {searchQuery.trim() && (
        <p className="form-hint mt-4" role="status" style={{ fontSize: '0.875rem' }}>
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
    </Section>
  );
};

export default ProductsSection;