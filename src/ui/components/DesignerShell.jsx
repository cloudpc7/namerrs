/**
 * DesignerShell.jsx — Offcanvas body hosting the per-product designer wizard.
 */

import { useSelector } from 'react-redux';
import { selectProductContent } from '../../redux/slices/content.slice';
import { selectDesignerMode, selectDesignerProductId } from '../../redux/slices/design.slice';
import { DESIGNER_MODE } from '../../redux/constants/design.constants';
import DesignerWizard from '../../features/designers/DesignerWizard';
import { Stack } from './primitives';

const DesignerShell = () => {
  const productId = useSelector(selectDesignerProductId);
  const mode = useSelector(selectDesignerMode);
  const product = useSelector((state) => selectProductContent(state, productId));

  const modeLabel = mode === DESIGNER_MODE.EDIT ? 'Edit design' : 'Add to order';

  return (
    <Stack gap="sm">
      <p className="section-heading__eyebrow" style={{ margin: 0 }}>
        {modeLabel}
      </p>
      {product?.description && (
        <p className="form-hint" style={{ fontSize: '0.875rem' }}>
          {product.description}
        </p>
      )}
      {productId && <DesignerWizard />}
    </Stack>
  );
};

export default DesignerShell;