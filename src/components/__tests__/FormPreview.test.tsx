import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormPreview from '../FormPreview';
import { FieldType } from '../../types';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key === 'formBuilder.formPreview.addField' ? 'Add Field' : key,
  }),
}));

describe('FormPreview Component', () => {
  const mockSetFormTitle = jest.fn();
  const mockAddField = jest.fn();
  const mockUpdateFieldValue = jest.fn();
  const mockToggleFieldMenu = jest.fn();
  const mockSetShowFieldMenu = jest.fn();
  const mockToggleActiveField = jest.fn();
  const mockTogglePreviewModal = jest.fn();
  
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
    formTitle: 'Test Form',
    setFormTitle: mockSetFormTitle,
    fields: testFields,
    activeField: null,
    showLabels: true,
    showFieldMenu: true,
    bgColor: '#ffffff',
    fontFamily: 'Arial',
    toggleFieldMenu: mockToggleFieldMenu,
    setShowFieldMenu: mockSetShowFieldMenu,
    addField: mockAddField,
    updateFieldValue: mockUpdateFieldValue,
    toggleActiveField: mockToggleActiveField,
    isPreviewModalOpen: false,
    togglePreviewModal: mockTogglePreviewModal
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form title', () => {
    render(<FormPreview {...defaultProps} />);
    
    expect(screen.getByDisplayValue('Test Form')).toBeInTheDocument();
  });

  test('renders the form fields', () => {
    render(<FormPreview {...defaultProps} />);
    
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
  });

  test('calls setFormTitle when title input changes', () => {
    render(<FormPreview {...defaultProps} />);
    
    const titleInput = screen.getByDisplayValue('Test Form');
    fireEvent.change(titleInput, { target: { value: 'New Form Title' } });
    
    expect(mockSetFormTitle).toHaveBeenCalledWith('New Form Title');
  });

  test('calls toggleActiveField when a field is clicked', () => {
    render(
      <FormPreview 
        {...defaultProps} 
        toggleActiveField={(id) => {
          mockToggleActiveField(id);
        }}
      />
    );
    
    const fieldElement = screen.getByText('First Name').closest('div');
    fireEvent.click(fieldElement!);
    
    expect(mockToggleActiveField).toHaveBeenCalledWith('field-1');
  });

  test('applies the background color style', () => {
    render(<FormPreview {...defaultProps} bgColor="#f0f0f0" />);
    
    const formContainer = document.querySelector('.flex-1');
    expect(formContainer).toHaveStyle('background-color: #f0f0f0');
  });

  test('applies the font family style', () => {
    render(<FormPreview {...defaultProps} fontFamily="Roboto" />);
    
    const formContainer = document.querySelector('.flex-1');
    expect(formContainer).toHaveStyle('font-family: Roboto');
  });

  test('calls addField when "Add Field" button is clicked', () => {
    render(<FormPreview {...defaultProps} />);
    
    const addButton = screen.getByText('Add Field');
    fireEvent.click(addButton);
    
    expect(mockToggleFieldMenu).toHaveBeenCalled();
  });

  test('highlights active field when it matches activeField prop', () => {
    render(<FormPreview {...defaultProps} activeField="field-1" />);
    
    expect(screen.getByText('First Name')).toBeInTheDocument();
  });
});
