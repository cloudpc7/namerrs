/**
 * OffcanvasHost.jsx — Global offcanvas host for designer and cart panels.
 */

import { useDispatch, useSelector } from 'react-redux';
import Offcanvas from './Offcanvas';
import DesignerShell from './DesignerShell';
import CartShell from './CartShell';
import {
  closePanel,
  selectDesignerProductId,
  selectIsPanelOpen,
  selectPanelType,
} from '../../redux/slices/design.slice';
import { selectProductContent } from '../../redux/slices/content.slice';
import { selectCheckoutStep } from '../../redux/slices/cart.slice';
import { PANEL_TYPE } from '../../redux/constants/design.constants';
import { CHECKOUT_STEP } from '../../redux/constants/cart.constants';

const OffcanvasHost = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsPanelOpen);
  const panelType = useSelector(selectPanelType);
  const productId = useSelector(selectDesignerProductId);
  const product = useSelector((state) => selectProductContent(state, productId));
  const checkoutStep = useSelector(selectCheckoutStep);

  const handleClose = () => dispatch(closePanel());

  const cartTitle =
    checkoutStep === CHECKOUT_STEP.CHECKOUT
      ? 'Checkout'
      : checkoutStep === CHECKOUT_STEP.CONFIRMATION
        ? 'Order confirmed'
        : 'Cart';

  const title =
    panelType === PANEL_TYPE.CART
      ? cartTitle
      : product?.name
        ? `${product.name} Designer`
        : 'Product Designer';

  return (
    <Offcanvas isOpen={isOpen} onClose={handleClose} title={title}>
      {panelType === PANEL_TYPE.CART ? <CartShell /> : <DesignerShell />}
    </Offcanvas>
  );
};

export default OffcanvasHost;