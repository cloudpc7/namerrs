/**
 * BusinessCardDesigner.test.jsx — Canvas designer interactions.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BusinessCardDesigner from '../src/features/designers/BusinessCardDesigner';
import { createDefaultBusinessCardDesign } from '../src/features/designers/businessCard/designModel';

jest.mock('@react-spring/web', () => ({
  useSpring: (config) => (typeof config === 'function' ? config() : config),
  animated: {
    div: ({ children, style, ...props }) => (
      <div style={style} {...props}>
        {children}
      </div>
    ),
  },
}));

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

describe('BusinessCardDesigner', () => {
  it('renders card canvas and flip control', () => {
    const onChange = jest.fn();
    render(
      <BusinessCardDesigner
        design={createDefaultBusinessCardDesign()}
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText(/business card designer/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /flip card/i })).toBeInTheDocument();
    expect(screen.getByText(/3\.5 × 2 in/i)).toBeInTheDocument();
  });

  it('flips to back of card', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const design = createDefaultBusinessCardDesign();

    render(<BusinessCardDesigner design={design} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /flip card/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ activeSide: 'back' })
    );
  });

  it('copies front layout to back', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const design = createDefaultBusinessCardDesign();

    render(<BusinessCardDesigner design={design} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /copy front to back/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        back: expect.objectContaining({
          elements: expect.arrayContaining([
            expect.objectContaining({ type: 'text', fieldKey: 'name' }),
          ]),
        }),
      })
    );
  });
});