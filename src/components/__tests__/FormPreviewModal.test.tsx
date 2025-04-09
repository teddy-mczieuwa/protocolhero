import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormPreviewModal from '../FormPreviewModal';
import { FieldType } from '../../types';

describe('FormPreviewModal Component', () => {
  const mockOnClose = jest.fn();
  
  const testFields: FieldType[] = [
    {
      id: 'field-1',
      value: '',
      inputType: 'text',
      label: 'First Name',
      placeholder: 'John'
    },
    {
      id: 'field-2',
      value: '',
      inputType: 'text',
      label: 'Last Name',
      placeholder: 'Doe'
    }
  ];
  
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    formTitle: 'Test Form',
    fields: testFields,
    showLabels: true,
    bgColor: '#ffffff',
    fontFamily: 'Arial'
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders when isOpen is true', () => {
    render(<FormPreviewModal {...defaultProps} />);
    
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(<FormPreviewModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Test Form')).not.toBeInTheDocument();
    expect(screen.queryByText('First Name')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<FormPreviewModal {...defaultProps} />);
    
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('applies the background color style', () => {
    render(<FormPreviewModal {...defaultProps} bgColor="#f0f0f0" />);
    
    const formContainer = screen.getByText('Test Form').closest('.w-full');
    expect(formContainer).toHaveStyle('background-color: #f0f0f0');
  });

  test('applies the font family style', () => {
    render(<FormPreviewModal {...defaultProps} fontFamily="Roboto" />);
    
    const formContainer = screen.getByText('Test Form').closest('.w-full');
    expect(formContainer).toHaveStyle('font-family: Roboto');
  });

  test('does not show labels when showLabels is false', () => {
    render(<FormPreviewModal {...defaultProps} showLabels={false} />);
    
    expect(screen.queryByText('First Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Last Name')).not.toBeInTheDocument();
  });
});
