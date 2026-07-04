/**
 * DesignerShell.jsx — Offcanvas body hosting the per-product designer wizard.
 */

import { useSelector } from 'react-redux';
import { selectProductContent } from '../../redux/slices/content.slice';
import { selectDesignerMode, selectDesignerProductId } from '../../redux/slices/design.slice';
import { DESIGNER_MODE } from '../../redux/constants/design.constants';
import DesignerWizard from '../../features/designers/DesignerWizard';


const DesignerShell = () => {
  const productId = useSelector(selectDesignerProductId);
  const mode = useSelector(selectDesignerMode);
  const product = useSelector((state) => selectProductContent(state, productId));

  const modeLabel = mode === DESIGNER_MODE.EDIT ? 'Edit design' : 'Add to order';

  return (
    <div className="designer-shell">
      <p className="designer-shell__eyebrow">{modeLabel}</p>
      {productId && <DesignerWizard />}
    </div>
  );
};

export default DesignerShell;