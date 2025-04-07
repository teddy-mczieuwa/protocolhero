import React from 'react';
import { FieldType } from '../types';
// Remove unused import

interface FormFieldProps {
  field: FieldType;
  isActive: boolean;
  showLabels: boolean;
  updateFieldValue: (id: number, value: string) => void;
  onFieldClick: (id: number) => void;
}

const FormField: React.FC<FormFieldProps> = ({ 
  field, 
  isActive, 
  showLabels, 
  updateFieldValue, 
  onFieldClick 
}) => {
  const handleClick = () => {
    onFieldClick(field.id);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFieldClick(field.id);
  };

  return (
    <div 
      key={field.id} 
      className={`relative ${isActive ? 'ring-2 ring-blue-500' : ''}`}
      onClick={handleClick}
    >
      {showLabels && (
        <label 
          htmlFor={`field-${field.id}`} 
          className="block text-gray-700 text-sm md:text-base mb-1"
        >
          {field.label}
          {field.validation?.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex">
        {field.inputType === 'textarea' ? (
          <textarea
            id={`field-${field.id}`}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className={`border rounded py-1 md:py-2 px-2 md:px-3 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.isValid === false ? 'border-red-500' : ''}`}
            aria-invalid={field.isValid === false}
            aria-describedby={field.isValid === false ? `error-${field.id}` : undefined}
          />
        ) : field.inputType === 'select' ? (
          <select
            id={`field-${field.id}`}
            value={field.value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className={`border rounded py-1 md:py-2 px-2 md:px-3 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.isValid === false ? 'border-red-500' : ''}`}
            aria-invalid={field.isValid === false}
            aria-describedby={field.isValid === false ? `error-${field.id}` : undefined}
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        ) : field.inputType === 'checkbox' ? (
          <div className="flex items-center" id={`field-${field.id}`}>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={field.value === 'true'}
                onChange={(e) => updateFieldValue(field.id, e.target.checked ? 'true' : 'false')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
            </label>
          </div>
        ) : field.inputType === 'radio' ? (
          <div className="flex flex-col space-y-3 w-full" id={`field-${field.id}`}>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`${field.id}-yes`}
                name={`radio-group-${field.id}`}
                value="yes"
                checked={field.value === 'yes'}
                onChange={(e) => updateFieldValue(field.id, e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-500"
              />
              <label htmlFor={`${field.id}-yes`} className="text-sm md:text-base cursor-pointer font-medium">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`${field.id}-no`}
                name={`radio-group-${field.id}`}
                value="no"
                checked={field.value === 'no'}
                onChange={(e) => updateFieldValue(field.id, e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-500"
              />
              <label htmlFor={`${field.id}-no`} className="text-sm md:text-base cursor-pointer font-medium">No</label>
            </div>
          </div>
        ) : (
          <input
            id={`field-${field.id}`}
            type={field.inputType}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className={`border rounded py-1 md:py-2 px-2 md:px-3 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${field.isValid === false ? 'border-red-500' : ''}`}
            aria-invalid={field.isValid === false}
            aria-describedby={field.isValid === false ? `error-${field.id}` : undefined}
          />
        )}
        {/* Display validation error message if field is invalid */}
        {field.isValid === false && field.errorMessage && (
          <div 
            id={`error-${field.id}`} 
            className="text-red-500 text-sm mt-1 absolute right-10"
            aria-live="polite"
          >
            {field.errorMessage}
          </div>
        )}
        <button 
          className="ml-1 md:ml-2 p-1 md:p-2 border rounded flex items-center justify-center"
          onClick={stopPropagation}
          aria-label="Field options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FormField;
