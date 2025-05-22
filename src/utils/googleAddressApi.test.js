import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleAddressApi from './GoogleAddressApi';

// Mock @react-google-maps/api
jest.mock('@react-google-maps/api', () => ({
  useLoadScript: jest.fn(),
  StandaloneSearchBox: ({ children, onLoad }) => {
    const ref = {
      getPlaces: jest.fn(() => [{ formatted_address: '123 Main St, USA' }]),
    };
    onLoad(ref);
    return (
      <div data-testid="standalone-searchbox">
        {children}
      </div>
    );
  },
}));

const mockUseLoadScript = require('@react-google-maps/api').useLoadScript;

describe('GoogleAddressApi', () => {
  const defaultProps = {
    onAddressSelect: jest.fn(),
    initialAddress: '',
    onBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.resetModules(); // Reset module cache
    jest.clearAllMocks();
    mockUseLoadScript.mockReturnValue({
      isLoaded: true,
      loadError: null,
    });
  });

  test('renders Form.Control when Google Maps is not loaded', () => {
    mockUseLoadScript.mockReturnValue({
      isLoaded: false,
      loadError: null,
    });
    render(<GoogleAddressApi {...defaultProps} />);
    const input = screen.getByTestId('address-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'address');
    expect(input).toHaveAttribute('placeholder', 'Enter address');
    expect(input).toHaveAttribute('aria-label', 'Address input');
    expect(input).toHaveValue('');
    expect(screen.queryByTestId('standalone-searchbox')).not.toBeInTheDocument();
  });

  test('renders StandaloneSearchBox with Form.Control when Google Maps is loaded', () => {
    render(<GoogleAddressApi {...defaultProps} />);
    const input = screen.getByTestId('address-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'address');
    expect(input).toHaveAttribute('placeholder', 'Enter address');
    expect(input).toHaveAttribute('aria-label', 'Address input with autocomplete');
    expect(input).toHaveValue('');
    expect(screen.getByTestId('standalone-searchbox')).toBeInTheDocument();
  });

  test('calls onAddressSelect on input change', () => {
    const onAddressSelect = jest.fn();
    render(<GoogleAddressApi {...defaultProps} onAddressSelect={onAddressSelect} />);
    const input = screen.getByTestId('address-input');
    fireEvent.change(input, { target: { value: '456 Elm St' } });
    expect(onAddressSelect).toHaveBeenCalledWith('456 Elm St');
    expect(input).toHaveValue('456 Elm St');
  });

  test('calls onAddressSelect and onBlur on blur', () => {
    const onAddressSelect = jest.fn();
    const onBlur = jest.fn();
    const initialAddress = '789 Oak St';
    render(<GoogleAddressApi {...defaultProps} onAddressSelect={onAddressSelect} onBlur={onBlur} initialAddress={initialAddress} />);
    const input = screen.getByTestId('address-input');
    fireEvent.blur(input);
    expect(onAddressSelect).toHaveBeenCalledWith('789 Oak St');
    expect(onBlur).toHaveBeenCalled();
  });

  test('calls onAddressSelect on autocomplete selection', () => {
    const onAddressSelect = jest.fn();
    render(<GoogleAddressApi {...defaultProps} onAddressSelect={onAddressSelect} />);
    const input = screen.getByTestId('address-input');
    fireEvent.change(input, { target: { value: '123 Main St, USA' } });
    expect(onAddressSelect).toHaveBeenCalledWith('123 Main St, USA');
    expect(input).toHaveValue('123 Main St, USA');
  });

  test('handles initialAddress correctly', () => {
    const initialAddress = '101 Pine St';
    render(<GoogleAddressApi {...defaultProps} initialAddress={initialAddress} />);
    const input = screen.getByTestId('address-input');
    expect(input).toHaveValue('101 Pine St');
  });

  test('maintains state when Google Maps fails to load', () => {
    mockUseLoadScript.mockReturnValue({
      isLoaded: false,
      loadError: new Error('Load failed'),
    });
    const onAddressSelect = jest.fn();
    const initialAddress = '202 Cedar St';
    render(<GoogleAddressApi {...defaultProps} initialAddress={initialAddress} onAddressSelect={onAddressSelect} />);
    const input = screen.getByTestId('address-input');
    fireEvent.change(input, { target: { value: '303 Birch St' } });
    expect(onAddressSelect).toHaveBeenCalledWith('303 Birch St');
    expect(input).toHaveValue('303 Birch St');
  });

  test('displays validation error when isInvalid is true', () => {
    render(<GoogleAddressApi {...defaultProps} isInvalid={true} />);
    const input = screen.getByTestId('address-input');
    expect(input).toHaveClass('is-invalid');
    expect(input).toHaveAttribute('aria-describedby', 'address-error');
    const errorFeedback = screen.getByText('Address is required');
    expect(errorFeedback).toBeInTheDocument();
    expect(errorFeedback).toHaveAttribute('id', 'address-error');
    expect(errorFeedback).toHaveAttribute('role', 'alert');
  });
});