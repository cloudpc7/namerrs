/**
 * ProductDetailModal.jsx — Portal modal for product specs, options, and designer entry.
 */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { getProductImageUrl } from '../../constants/assets.constants';
import { selectProductContent } from '../../redux/slices/content.slice';
import { openDesigner } from '../../redux/slices/design.slice';
import { DESIGNER_MODE } from '../../redux/constants/design.constants';
import { PRODUCT_DETAIL_STATUS } from '../../redux/constants/productDetail.constants';
import {
  closeProductDetail,
  ensureProductDetail,
  selectIsProductDetailOpen,
  selectProductDetailError,
  selectProductDetailId,
  selectProductDetailOptions,
  selectProductDetailStatus,
} from '../../redux/slices/productDetail.slice';
import {
  buildInitialDesignFromOptions,
  getReadOnlySpecs,
} from '../../utils/productOptions';
import ProductOptionsForm from './ProductOptionsForm';
import {
  Button,
  IconButton,
  MediaFrame,
  SpecTable,
  Stack,
  Alert,
  Skeleton,
} from './primitives';

const MODAL_ID = 'product-detail-modal';

const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const isOpen = useSelector(selectIsProductDetailOpen);
  const productId = useSelector(selectProductDetailId);
  const status = useSelector(selectProductDetailStatus);
  const error = useSelector(selectProductDetailError);
  const selectedOptions = useSelector(selectProductDetailOptions);
  const product = useSelector((state) => selectProductContent(state, productId));

  useFocusTrap(isOpen, panelRef, () => dispatch(closeProductDetail()));

  useEffect(() => {
    if (!isOpen || !productId) {
      return undefined;
    }

    dispatch(ensureProductDetail(productId));
  }, [dispatch, isOpen, productId]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !productId) {
    return null;
  }

  const imageUrl = getProductImageUrl(productId, product);
  const readOnlySpecs = getReadOnlySpecs(product);

  const handleDesignerOpen = () => {
    dispatch(
      openDesigner({
        productId,
        mode: DESIGNER_MODE.ADD,
        minQuantity: product?.minQuantity || 1,
        initialDesign: buildInitialDesignFromOptions(productId, selectedOptions),
      })
    );
    dispatch(closeProductDetail());
  };

  return createPortal(
    <div className="product-detail-modal" aria-hidden={false}>
      <button
        type="button"
        className="product-detail-modal__backdrop"
        aria-label="Close product details"
        onClick={() => dispatch(closeProductDetail())}
      />

      <div
        ref={panelRef}
        id={MODAL_ID}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-modal-title"
        className="product-detail-modal__panel"
      >
        <div className="product-detail-modal__header">
          <h2 id="product-detail-modal-title" className="product-detail-modal__title">
            {product?.name || 'Product details'}
          </h2>
          <IconButton
            label={`Close ${product?.name || 'product'} details`}
            onClick={() => dispatch(closeProductDetail())}
          >
            <X size={20} aria-hidden="true" />
          </IconButton>
        </div>

        <div className="product-detail-modal__body">
          {status === PRODUCT_DETAIL_STATUS.LOADING && !product?.options?.length && (
            <Stack gap="md">
              <Skeleton variant="block" style={{ height: '7rem', maxWidth: '9.5rem', marginInline: 'auto' }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" style={{ width: '70%' }} />
            </Stack>
          )}

          {error && (
            <Alert variant="error">{error}</Alert>
          )}

          {product && (
            <Stack gap="md">
              {imageUrl && (
                <MediaFrame
                  src={imageUrl}
                  alt={product.name}
                  className="product-detail-modal__media"
                />
              )}

              <ProductOptionsForm options={product.options} />

              {product.minQuantity > 1 && (
                <p className="product-detail-modal__minimum">
                  Minimum order: {product.minQuantity}
                </p>
              )}

              {readOnlySpecs.length > 0 && <SpecTable specs={readOnlySpecs} />}
            </Stack>
          )}
        </div>

        <div className="product-detail-modal__footer">
          <div className="product-detail-modal__actions">
            <Button
              className="product-detail-modal__cta"
              data-testid="product-detail-add-to-order"
              onClick={handleDesignerOpen}
            >
              Add to order
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductDetailModal;
export { MODAL_ID as PRODUCT_DETAIL_MODAL_ID };