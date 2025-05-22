console.log('jest.setup.js loaded');
import '@testing-library/jest-dom/extend-expect';
import DOMPurify from 'dompurify';

// Mock DOMPurify.sanitize
jest.mock('dompurify', () => ({
  sanitize: jest.fn((input) => {
    if (/<script>|<\/script>/i.test(input)) {
      return '';
    }
    return input;
  }),
}));

// Mock GoogleAddressApi
jest.mock('../../utils/googleAddressApi', () => ({
  __esModule: true,
  default: ({ isInvalid, ...props }) => (
    <input
      type="text"
      aria-label="Address input"
      data-testid="address-input"
      className={isInvalid ? 'is-invalid' : ''}
      {...props}
    />
  ),
}));

// Mock react-bootstrap
jest.mock('react-bootstrap', () => ({
  Form: ({ children, ...props }) => <form {...props}>{children}</form>,
  FormGroup: ({ children, ...props }) => <div {...props}>{children}</div>,
  FormLabel: ({ children, ...props }) => <label {...props}>{children}</label>,
  FormControl: ({ ...props }) => <input {...props} />,
  FormSelect: ({ children, ...props }) => <select {...props}>{children}</select>,
  FormControlFeedback: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));