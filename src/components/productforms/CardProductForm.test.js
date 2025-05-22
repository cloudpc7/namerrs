import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CardDesignContext } from '../../providers/products/cardDesignProvider';
import CardProductForm from '../productforms/CardProductForm';

const mockStore = configureStore([]);

describe('CardProductForm', () => {
  it('renders correctly with valid context', () => {
    const mockContext = {
      cardStock: 'default',
      cardColor: '#ffffff',
      info: {
        businessName: '',
        email: '',
        phone: '',
        address: '',
      },
      font: '',
      fonts: [
        { family: 'Roboto' },
        { family: 'Arial' },
      ],
      handleCardStock: jest.fn(),
      handleCardColor: jest.fn(),
      handleInfo: jest.fn(),
      handleSelectedFont: jest.fn(),
    };

    const store = mockStore({
      cardDesign: {
        isLoading: false,
        errMsg: '',
      },
    });

    render(
      <Provider store={store}>
        <CardDesignContext.Provider value={mockContext}>
          <CardProductForm />
        </CardDesignContext.Provider>
      </Provider>
    );

    expect(screen.getByTestId('card-design-form')).toBeInTheDocument();
    expect(screen.getByTestId('card-stock-select')).toHaveValue('default');
    expect(screen.getByLabelText('Business name input')).toHaveValue('');
    expect(screen.getByLabelText('Email input')).toHaveValue('');
    expect(screen.getByLabelText('Phone number input')).toHaveValue('');
    expect(screen.getByTestId('address-input')).toHaveValue('');
    expect(screen.getByLabelText('Toggle color picker')).toBeInTheDocument();
    expect(screen.getByTestId('font-select')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders error message with invalid context', () => {
    const store = mockStore({
      cardDesign: {
        isLoading: false,
        errMsg: '',
      },
    });

    render(
      <Provider store={store}>
        <CardDesignContext.Provider value={null}>
          <CardProductForm />
        </CardDesignContext.Provider>
      </Provider>
    );

    const errorDiv = screen.getByTestId('context-error');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveAttribute('role', 'alert');
    expect(screen.getByText('Form context is unavailable. Please try again later.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reload page' })).toBeInTheDocument();
  });

  it('displays validation errors on submit with invalid data', async () => {
    const mockContext = {
      cardStock: 'default',
      cardColor: '#ffffff',
      info: {
        businessName: '',
        email: '',
        phone: '',
        address: '',
      },
      font: '',
      fonts: [
        { family: 'Roboto' },
        { family: 'Arial' },
      ],
      handleCardStock: jest.fn(),
      handleCardColor: jest.fn(),
      handleInfo: jest.fn(),
      handleSelectedFont: jest.fn(),
    };

    const store = mockStore({
      cardDesign: {
        isLoading: false,
        errMsg: '',
      },
    });

    render(
      <Provider store={store}>
        <CardDesignContext.Provider value={mockContext}>
          <CardProductForm />
        </CardDesignContext.Provider>
      </Provider>
    );

    const form = screen.getByTestId('card-design-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Business name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Address is required')).toBeInTheDocument();
    });

    const businessNameInput = screen.getByLabelText('Business name input');
    expect(businessNameInput).toHaveClass('is-invalid');
    expect(businessNameInput).toHaveAttribute('aria-describedby', 'businessName-error');
    expect(businessNameInput).toHaveFocus();

    const emailInput = screen.getByLabelText('Email input');
    expect(emailInput).toHaveClass('is-invalid');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');

    const addressInput = screen.getByTestId('address-input');
    expect(addressInput).toHaveClass('is-invalid');
    expect(addressInput).toHaveAttribute('aria-describedby', 'address-error');
  });

  it('updates context state when inputs change', async () => {
    const mockContext = {
      cardStock: 'default',
      cardColor: '#ffffff',
      info: {
        businessName: '',
        email: '',
        phone: '',
        address: '',
      },
      font: '',
      fonts: [
        { family: 'Roboto' },
        { family: 'Arial' },
      ],
      handleCardStock: jest.fn(),
      handleCardColor: jest.fn(),
      handleInfo: jest.fn(),
      handleSelectedFont: jest.fn(),
    };

    const store = mockStore({
      cardDesign: {
        isLoading: false,
        errMsg: '',
      },
    });

    render(
      <Provider store={store}>
        <CardDesignContext.Provider value={mockContext}>
          <CardProductForm />
        </CardDesignContext.Provider>
      </Provider>
    );

    // Simulate businessName input
    const businessNameInput = screen.getByLabelText('Business name input');
    fireEvent.change(businessNameInput, { target: { value: 'Test Business' } });
    await waitFor(() => {
      expect(mockContext.handleInfo).toHaveBeenCalledWith('businessName', 'Test Business');
    });

    // Simulate cardStock selection
    const cardStockSelect = screen.getByTestId('card-stock-select');
    fireEvent.change(cardStockSelect, { target: { value: 'gloss' } });
    expect(mockContext.handleCardStock).toHaveBeenCalledWith('gloss');

    // Simulate font selection
    const fontSelect = screen.getByTestId('font-select');
    fireEvent.change(fontSelect, { target: { value: 'Roboto' } });
    expect(mockContext.handleSelectedFont).toHaveBeenCalledWith('Roboto');
  });
});