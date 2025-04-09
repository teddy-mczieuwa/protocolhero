import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormHeader from '../FormHeader';

describe('FormHeader Component', () => {
  const mockTogglePreviewModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with title and publish button', () => {
    render(<FormHeader togglePreviewModal={mockTogglePreviewModal} />);
    
    expect(screen.getByText('My Forms')).toBeInTheDocument();
    expect(screen.getByText('formBuilder.header.title')).toBeInTheDocument();
    
    const publishButton = screen.getByText('formBuilder.buttons.publish');
    expect(publishButton).toBeInTheDocument();
  });

  test('calls togglePreviewModal when publish button is clicked', () => {
    render(<FormHeader togglePreviewModal={mockTogglePreviewModal} />);
    
    const publishButton = screen.getByText('formBuilder.buttons.publish');
    fireEvent.click(publishButton);
    
    expect(mockTogglePreviewModal).toHaveBeenCalledTimes(1);
  });

  test('renders with the correct styles', () => {
    render(<FormHeader togglePreviewModal={mockTogglePreviewModal} />);
    
    const link = screen.getByText('My Forms');
    expect(link).toHaveClass('text-blue-500');
    
    const publishButton = screen.getByText('formBuilder.buttons.publish');
    expect(publishButton).toHaveClass('bg-blue-500');
    expect(publishButton).toHaveClass('text-white');
  });
});
