import React from 'react';
import { FieldType } from '../types';

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
        <label className="block text-gray-700 text-sm md:text-base mb-1">{field.label}</label>
      )}
      <div className="flex">
        {field.inputType === 'textarea' ? (
          <textarea
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className="border rounded py-1 md:py-2 px-2 md:px-3 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : field.inputType === 'select' ? (
          <select
            value={field.value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className="border rounded py-1 md:py-2 px-2 md:px-3 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        ) : field.inputType === 'checkbox' ? (
          <input
            type="checkbox"
            checked={field.value === 'true'}
            onChange={(e) => updateFieldValue(field.id, e.target.checked ? 'true' : 'false')}
            className="h-4 w-4 md:h-5 md:w-5 mt-1"
          />
        ) : (
          <input
            type={field.inputType}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className="border rounded py-1 md:py-2 px-2 md:px-3 text-sm md:text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <button 
          className="ml-1 md:ml-2 p-1 md:p-2 border rounded flex items-center justify-center"
          onClick={stopPropagation}
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
