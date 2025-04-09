import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormProperties from '../FormProperties';
import { FieldType } from '../../types';

describe('FormProperties Component', () => {
  const mockUpdateFieldLabel = jest.fn();
  const mockUpdateFieldType = jest.fn();
  const mockUpdateFieldPlaceholder = jest.fn();
  const mockRemoveField = jest.fn();
  const mockUpdateFieldValidation = jest.fn();
  const mockUpdateFieldValidationMessages = jest.fn();
  
  const testField: FieldType = {
    id: 'test-id',
    value: '',
    inputType: 'text',
    label: 'Test Label',
    placeholder: 'Test Placeholder',
    validation: {
      required: true
    }
  };
  
  const fields: FieldType[] = [testField];
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders FormProperties when activeField is not null', () => {
    render(
      <FormProperties 
        activeField="test-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
        updateFieldValidation={mockUpdateFieldValidation}
        updateFieldValidationMessages={mockUpdateFieldValidationMessages}
      />
    );
    
    expect(screen.getByText('Field Properties')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Label')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Placeholder')).toBeInTheDocument();
  });

  test('does not render when activeField is null', () => {
    const { container } = render(
      <FormProperties 
        activeField={null}
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('does not render when activeField is not found in fields', () => {
    const { container } = render(
      <FormProperties 
        activeField="non-existent-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('calls updateFieldLabel when label input changes', () => {
    render(
      <FormProperties 
        activeField="test-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
        updateFieldValidation={mockUpdateFieldValidation}
        updateFieldValidationMessages={mockUpdateFieldValidationMessages}
      />
    );
    
    const labelInput = screen.getByDisplayValue('Test Label');
    fireEvent.change(labelInput, { target: { value: 'New Label' } });
    
    expect(mockUpdateFieldLabel).toHaveBeenCalledWith('test-id', 'New Label');
  });

  test('calls updateFieldType when type select changes', () => {
    render(
      <FormProperties 
        activeField="test-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
        updateFieldValidation={mockUpdateFieldValidation}
        updateFieldValidationMessages={mockUpdateFieldValidationMessages}
      />
    );
    
    const typeSelect = screen.getByDisplayValue('Text');
    fireEvent.change(typeSelect, { target: { value: 'email' } });
    
    expect(mockUpdateFieldType).toHaveBeenCalledWith('test-id', 'email');
  });

  test('calls updateFieldPlaceholder when placeholder input changes', () => {
    render(
      <FormProperties 
        activeField="test-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
        updateFieldValidation={mockUpdateFieldValidation}
        updateFieldValidationMessages={mockUpdateFieldValidationMessages}
      />
    );
    
    const placeholderInput = screen.getByDisplayValue('Test Placeholder');
    fireEvent.change(placeholderInput, { target: { value: 'New Placeholder' } });
    
    expect(mockUpdateFieldPlaceholder).toHaveBeenCalledWith('test-id', 'New Placeholder');
  });

  test('shows validation settings when button is clicked', () => {
    render(
      <FormProperties 
        activeField="test-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
        updateFieldValidation={mockUpdateFieldValidation}
        updateFieldValidationMessages={mockUpdateFieldValidationMessages}
      />
    );
    
    expect(screen.queryByText('Validation Rules')).not.toBeInTheDocument();
    
    const validationButton = screen.getByText('Validation Settings');
    fireEvent.click(validationButton);
    
    expect(screen.getByText('Validation Rules')).toBeInTheDocument();
  });

  test('calls removeField when Remove Field button is clicked', () => {
    render(
      <FormProperties 
        activeField="test-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
        updateFieldValidation={mockUpdateFieldValidation}
        updateFieldValidationMessages={mockUpdateFieldValidationMessages}
      />
    );
    
    const removeButton = screen.getByText('Remove Field');
    fireEvent.click(removeButton);
    
    expect(mockRemoveField).toHaveBeenCalledWith('test-id');
  });

  test('validation rule inputs have white text while labels remain dark gray', () => {
    render(
      <FormProperties 
        activeField="test-id"
        fields={fields}
        updateFieldLabel={mockUpdateFieldLabel}
        updateFieldType={mockUpdateFieldType}
        updateFieldPlaceholder={mockUpdateFieldPlaceholder}
        removeField={mockRemoveField}
        updateFieldValidation={mockUpdateFieldValidation}
        updateFieldValidationMessages={mockUpdateFieldValidationMessages}
      />
    );
    
    const validationButton = screen.getByText('Validation Settings');
    fireEvent.click(validationButton);
    
    const validationLabels = screen.getAllByText(/Min Length|Max Length|Required/);
    validationLabels.forEach(label => {
      expect(label).toHaveClass('text-gray-800');
    });
    
    const validationInputs = screen.getAllByRole('spinbutton');
    validationInputs.forEach(input => {
      expect(input.className).toContain('text-white');
    });
  });
});
