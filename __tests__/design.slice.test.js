/**
 * design.slice.test.js — Offcanvas designer and cart panel state tests.
 */

import designReducer, {
  openDesigner,
  openCart,
  closePanel,
  selectPanelState,
  selectIsPanelOpen,
  selectPanelType,
  selectDesignerProductId,
  selectDesignerMode,
} from '../src/redux/slices/design.slice';
import { PANEL_TYPE, DESIGNER_MODE } from '../src/redux/constants/design.constants';

const initialState = {
  isOpen: false,
  panel: null,
  productId: null,
  mode: null,
};

describe('design slice', () => {
  it('openDesigner opens the designer panel with product and mode', () => {
    const nextState = designReducer(
      initialState,
      openDesigner({ productId: 'businessCards', mode: DESIGNER_MODE.EDIT })
    );

    expect(nextState).toEqual({
      isOpen: true,
      panel: PANEL_TYPE.DESIGNER,
      productId: 'businessCards',
      mode: DESIGNER_MODE.EDIT,
    });
  });

  it('openDesigner defaults mode to add', () => {
    const nextState = designReducer(
      initialState,
      openDesigner({ productId: 'tshirts' })
    );

    expect(nextState.mode).toBe(DESIGNER_MODE.ADD);
  });

  it('openCart opens the cart panel', () => {
    const nextState = designReducer(initialState, openCart());

    expect(nextState).toEqual({
      isOpen: true,
      panel: PANEL_TYPE.CART,
      productId: null,
      mode: null,
    });
  });

  it('openDesigner takes priority over an open cart panel', () => {
    const cartOpenState = designReducer(initialState, openCart());
    const nextState = designReducer(
      cartOpenState,
      openDesigner({ productId: 'banners', mode: DESIGNER_MODE.ADD })
    );

    expect(nextState.panel).toBe(PANEL_TYPE.DESIGNER);
    expect(nextState.productId).toBe('banners');
  });

  it('closePanel resets panel state', () => {
    const openState = designReducer(
      initialState,
      openDesigner({ productId: 'hats', mode: DESIGNER_MODE.ADD })
    );
    const nextState = designReducer(openState, closePanel());

    expect(nextState).toEqual(initialState);
  });

  it('selectors return panel state', () => {
    const state = {
      design: {
        isOpen: true,
        panel: PANEL_TYPE.DESIGNER,
        productId: 'magnets',
        mode: DESIGNER_MODE.EDIT,
      },
    };

    expect(selectPanelState(state)).toEqual(state.design);
    expect(selectIsPanelOpen(state)).toBe(true);
    expect(selectPanelType(state)).toBe(PANEL_TYPE.DESIGNER);
    expect(selectDesignerProductId(state)).toBe('magnets');
    expect(selectDesignerMode(state)).toBe(DESIGNER_MODE.EDIT);
  });
});