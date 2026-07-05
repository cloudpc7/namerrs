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
  it('renders shirt canvas with a single-line hint', () => {
    const onChange = jest.fn();
    render(
      <TshirtDesigner design={createDefaultTshirtDesign()} onChange={onChange} />
    );

    expect(screen.getByLabelText(/t-shirt designer/i)).toBeInTheDocument();
    expect(screen.getByText(/tap a line to type/i)).toBeInTheDocument();
  });

  it('changes fit when female is selected on sizes tab', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const design = createDefaultTshirtDesign();

    render(<TshirtDesigner design={design} onChange={onChange} activePanel="sizes" />);

    await user.click(screen.getByLabelText(/female/i));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ fit: 'female' })
    );
  });

  it('shows size chart on sizes tab', () => {
    const onChange = jest.fn();
    render(
      <TshirtDesigner design={createDefaultTshirtDesign()} onChange={onChange} activePanel="sizes" />
    );
    expect(screen.getByText(/size chart/i)).toBeInTheDocument();
  });

  it('applies shirt color preset on color tab', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const design = createDefaultTshirtDesign();

    render(<TshirtDesigner design={design} onChange={onChange} activePanel="color" />);

    await user.click(screen.getByLabelText('Navy'));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ shirtColor: '#1e3a5f' })
    );
  });

  it('flips to back of shirt from canvas control', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const design = createDefaultTshirtDesign();

    render(<TshirtDesigner design={design} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /flip shirt — show back/i }));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ activeView: 'back' })
    );
  });

  it('shows back print placement on print tab', () => {
    const onChange = jest.fn();
    render(
      <TshirtDesigner design={createDefaultTshirtDesign()} onChange={onChange} activePanel="print" />
    );

    expect(screen.getByLabelText(/back print placement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/front print placement/i)).toBeInTheDocument();
  });
});