import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormSettings from '../FormSettings';
import { FieldType } from '../../types';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'formBuilder.formSettings.background': 'Background Color',
        'formBuilder.formSettings.font': 'Font Family',
        'formBuilder.formSettings.showLabels': 'Show Labels',
        'formBuilder.buttons.on': 'ON',
        'formBuilder.buttons.off': 'OFF',
        'formBuilder.formProperties.title': 'Field Properties'
      };
      return translations[key] || key;
    },
  }),
}));

describe('FormSettings Component', () => {
  const mockSetBgColor = jest.fn();
  const mockSetFontFamily = jest.fn();
  const mockToggleLabels = jest.fn();
  const mockUpdateFieldLabel = jest.fn();
  const mockUpdateFieldType = jest.fn();
  const mockUpdateFieldPlaceholder = jest.fn();
  const mockUpdateFieldValidation = jest.fn();
  const mockUpdateFieldValidationMessages = jest.fn();
  const mockRemoveField = jest.fn();
  
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
    bgColor: '#ffffff',
    fontFamily: 'Arial',
    showLabels: true,
    colorOptions: ['#ffffff', '#f0f0f0', '#e0e0e0'],
    fontOptions: ['Arial', 'Roboto', 'Open Sans'],
    activeField: null,
    fields: testFields,
    setBgColor: mockSetBgColor,
    setFontFamily: mockSetFontFamily,
    toggleLabels: mockToggleLabels,
    updateFieldLabel: mockUpdateFieldLabel,
    updateFieldType: mockUpdateFieldType,
    updateFieldPlaceholder: mockUpdateFieldPlaceholder,
    updateFieldValidation: mockUpdateFieldValidation,
    updateFieldValidationMessages: mockUpdateFieldValidationMessages,
    removeField: mockRemoveField
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form appearance section', () => {
    render(<FormSettings {...defaultProps} />);
    
    expect(screen.getByText('Background Color')).toBeInTheDocument();
    expect(screen.getByText('Font Family')).toBeInTheDocument();
    expect(screen.getByText('Show Labels')).toBeInTheDocument();
  });

  test('displays color options', () => {
    render(<FormSettings {...defaultProps} />);
    
    const colorOptions = screen.getAllByTestId(/color-option-/);
    expect(colorOptions.length).toBe(3);
  });

  test('calls setBgColor when a color option is clicked', () => {
    render(<FormSettings {...defaultProps} />);
    
    const colorOption = screen.getByTestId('color-option-#f0f0f0');
    fireEvent.click(colorOption);
    
    expect(mockSetBgColor).toHaveBeenCalledWith('#f0f0f0');
  });

  test('calls setFontFamily when a font option is selected', () => {
    render(<FormSettings {...defaultProps} />);
    
    const fontSelect = screen.getByRole('combobox');
    fireEvent.change(fontSelect, { target: { value: 'Roboto' } });
    
    expect(mockSetFontFamily).toHaveBeenCalledWith('Roboto');
  });

  test('calls toggleLabels when show labels switch is clicked', () => {
    render(<FormSettings {...defaultProps} />);
    
    const labelsSwitch = screen.getByRole('checkbox', { hidden: true });
    fireEvent.click(labelsSwitch);
    
    expect(mockToggleLabels).toHaveBeenCalled();
  });

  test('renders FormProperties when activeField is set', () => {
    render(<FormSettings {...defaultProps} activeField="field-1" />);
    
    expect(screen.getByText('Field Properties')).toBeInTheDocument();
  });

  test('does not render FormProperties when activeField is null', () => {
    render(<FormSettings {...defaultProps} activeField={null} />);
    
    expect(screen.queryByText('Field Properties')).not.toBeInTheDocument();
  });
});
