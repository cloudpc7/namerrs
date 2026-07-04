/**
 * TshirtDesigner.test.jsx — Canvas designer interactions.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TshirtDesigner from '../src/features/designers/TshirtDesigner';
import { createDefaultTshirtDesign } from '../src/features/designers/tshirt/designModel';

jest.mock('react-easy-crop', () => ({
  __esModule: true,
  default: () => <div>Cropper</div>,
}));

describe('TshirtDesigner', () => {
  it('renders shirt canvas and fit controls', () => {
    const onChange = jest.fn();
    render(
      <TshirtDesigner design={createDefaultTshirtDesign()} onChange={onChange} />
    );

    expect(screen.getByLabelText(/t-shirt designer/i)).toBeInTheDocument();
    expect(screen.getByText(/drag elements onto the print area/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/male \/ unisex/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
  });

  it('changes fit when female is selected', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const design = createDefaultTshirtDesign();

    render(<TshirtDesigner design={design} onChange={onChange} />);

    await user.click(screen.getByLabelText(/female/i));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ fit: 'female' })
    );
  });

  it('shows size chart', () => {
    const onChange = jest.fn();
    render(<TshirtDesigner design={createDefaultTshirtDesign()} onChange={onChange} />);
    expect(screen.getByText(/size chart/i)).toBeInTheDocument();
  });

  it('applies shirt color preset', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const design = createDefaultTshirtDesign();

    render(<TshirtDesigner design={design} onChange={onChange} />);

    await user.click(screen.getByLabelText('Navy'));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ shirtColor: '#1e3a5f' })
    );
  });
});