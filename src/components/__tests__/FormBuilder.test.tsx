import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormBuilder from '../FormBuilder';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../Sidebar', () => {
  return function MockSidebar({ onClose }: { onClose: () => void }) {
    return (
      <div 
        data-testid="mock-sidebar"
        onClick={onClose}
      >
        Sidebar
      </div>
    );
  };
});

jest.mock('../FormHeader', () => {
  return function MockFormHeader({ togglePreviewModal }: { togglePreviewModal: () => void }) {
    return <div data-testid="mock-form-header" onClick={togglePreviewModal}>Form Header</div>;
  };
});

jest.mock('../FormPreview', () => {
  return function MockFormPreview() {
    return <div data-testid="mock-form-preview">Form Preview</div>;
  };
});

jest.mock('../FormSettings', () => {
  return function MockFormSettings() {
    return <div data-testid="mock-form-settings">Form Settings</div>;
  };
});

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose?: () => void;
  formTitle?: string;
  fields?: Array<{
    id: string;
    value: string;
    inputType: string;
    label: string;
    placeholder: string;
  }>;
  showLabels?: boolean;
  bgColor?: string;
  fontFamily?: string;
}

jest.mock('../FormPreviewModal', () => {
  return function MockFormPreviewModal({ isOpen }: FormPreviewModalProps) {
    return isOpen ? <div data-testid="mock-form-preview-modal">Form Preview Modal</div> : null;
  };
});

jest.mock('../../hooks/useFormFields', () => ({
  useFormFields: () => ({
    fields: [
      { id: 'mock-id-1', value: '', inputType: 'text', label: 'First Name', placeholder: 'John' },
      { id: 'mock-id-2', value: '', inputType: 'text', label: 'Last Name', placeholder: 'Doe' }
    ],
    activeField: null,
    addField: jest.fn(),
    removeField: jest.fn(),
    updateFieldValue: jest.fn(),
    updateFieldType: jest.fn(),
    updateFieldLabel: jest.fn(),
    updateFieldPlaceholder: jest.fn(),
    updateFieldValidation: jest.fn(),
    updateFieldValidationMessages: jest.fn(),
    toggleActiveField: jest.fn()
  })
}));

jest.mock('../../hooks/useFormSettings', () => ({
  useFormSettings: () => ({
    formTitle: 'Test Form',
    setFormTitle: jest.fn(),
    bgColor: '#ffffff',
    setBgColor: jest.fn(),
    fontFamily: 'Arial',
    setFontFamily: jest.fn(),
    showLabels: true,
    toggleLabels: jest.fn(),
    showFieldMenu: true,
    toggleFieldMenu: jest.fn(),
    setShowFieldMenu: jest.fn(),
    colorOptions: ['#ffffff', '#f0f0f0'],
    fontOptions: ['Arial', 'Roboto']
  })
}));

describe('FormBuilder Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders FormBuilder with all components on desktop', () => {
    render(<FormBuilder />);
    
    expect(screen.getByTestId('mock-form-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-form-preview')).toBeInTheDocument();
    expect(screen.getByTestId('mock-form-settings')).toBeInTheDocument();
    
    expect(screen.queryByTestId('mock-form-preview-modal')).not.toBeInTheDocument();
  });

  test('toggles sidebar on mobile when menu button is clicked', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    
    render(<FormBuilder />);
    
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    const sidebarContainer = screen.getByTestId('mock-sidebar').closest('div');
    expect(sidebarContainer).not.toHaveClass('hidden');
    expect(document.querySelector('.fixed.inset-0.z-10')).not.toBeNull();
    
    fireEvent.click(menuButton);
    
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  test('toggles preview modal when FormHeader is clicked', () => {
    render(<FormBuilder />);
    
    expect(screen.queryByTestId('mock-form-preview-modal')).not.toBeInTheDocument();
    
    const formHeader = screen.getByTestId('mock-form-header');
    fireEvent.click(formHeader);
    
    expect(screen.getByTestId('mock-form-preview-modal')).toBeInTheDocument();
    
    fireEvent.click(formHeader);
    
    expect(screen.queryByTestId('mock-form-preview-modal')).not.toBeInTheDocument();
  });

  test('closes sidebar when clicking the close button on mobile', () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
    
    render(<FormBuilder />);
    
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    const sidebarContainer = screen.getByTestId('mock-sidebar').closest('div');
    expect(sidebarContainer).not.toHaveClass('hidden');
    expect(document.querySelector('.fixed.inset-0.z-10')).not.toBeNull();
    
    fireEvent.click(menuButton);
    
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });
});
