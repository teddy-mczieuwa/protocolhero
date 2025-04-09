import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from '../FormField';
import { FieldType } from '../../types';

describe('FormField Component', () => {
  const mockUpdateFieldValue = jest.fn();
  const mockOnFieldClick = jest.fn();
  
  const baseField: FieldType = {
    id: 'test-id',
    value: '',
    inputType: 'text',
    label: 'Test Label',
    placeholder: 'Test Placeholder'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with a label when showLabels is true', () => {
    render(
      <FormField 
        field={baseField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  test('does not display label when showLabels is false', () => {
    render(
      <FormField 
        field={baseField}
        isActive={false}
        showLabels={false}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  test('shows required indicator when field has required validation', () => {
    const requiredField = {
      ...baseField,
      validation: { required: true }
    };

    render(
      <FormField 
        field={requiredField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('displays error message when field is invalid', () => {
    const invalidField = {
      ...baseField,
      isValid: false,
      errorMessage: 'This field is required'
    };

    render(
      <FormField 
        field={invalidField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('calls updateFieldValue when input value changes', () => {
    render(
      <FormField 
        field={baseField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    const input = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    expect(mockUpdateFieldValue).toHaveBeenCalledWith('test-id', 'New Value');
  });

  test('calls onFieldClick when field is clicked', () => {
    render(
      <FormField 
        field={baseField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    const fieldContainer = screen.getByText('Test Label').parentElement;
    fireEvent.click(fieldContainer!);
    
    expect(mockOnFieldClick).toHaveBeenCalledWith('test-id');
  });

  test('renders textarea for inputType textarea', () => {
    const textareaField = {
      ...baseField,
      inputType: 'textarea'
    };

    render(
      <FormField 
        field={textareaField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'field-test-id');
  });

  test('renders select for inputType select', () => {
    const selectField = {
      ...baseField,
      inputType: 'select'
    };

    render(
      <FormField 
        field={selectField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('renders checkbox for inputType checkbox', () => {
    const checkboxField = {
      ...baseField,
      inputType: 'checkbox'
    };

    render(
      <FormField 
        field={checkboxField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    const checkbox = screen.getByRole('checkbox', { hidden: true });
    expect(checkbox).toBeInTheDocument();
  });

  test('renders radio buttons for inputType radio', () => {
    const radioField = {
      ...baseField,
      inputType: 'radio'
    };

    render(
      <FormField 
        field={radioField}
        isActive={false}
        showLabels={true}
        updateFieldValue={mockUpdateFieldValue}
        onFieldClick={mockOnFieldClick}
      />
    );
    
    expect(screen.getByLabelText('Yes')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();
  });
});
