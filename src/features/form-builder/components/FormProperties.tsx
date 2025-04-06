import React from 'react';
import { FieldType } from '../types';

interface FormPropertiesProps {
  activeField: number | null;
  fields: FieldType[];
  updateFieldLabel: (id: number, label: string) => void;
  updateFieldType: (id: number, inputType: string) => void;
  updateFieldPlaceholder: (id: number, placeholder: string) => void;
  removeField: (id: number) => void;
}

const FormProperties: React.FC<FormPropertiesProps> = ({
  activeField,
  fields,
  updateFieldLabel,
  updateFieldType,
  updateFieldPlaceholder,
  removeField
}) => {
  if (activeField === null) return null;

  const field = fields.find(f => f.id === activeField);
  if (!field) return null;

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Field Properties</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            value={field.label}
            onChange={e => updateFieldLabel(field.id, e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select 
            value={field.inputType}
            onChange={e => updateFieldType(field.id, e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
            <option value="tel">Telephone</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="select">Dropdown</option>
            <option value="textarea">Text Area</option>
            <option value="button">Button</option>
            <option value="switch">Switch</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={e => updateFieldPlaceholder(field.id, e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        
        <div className="pt-2">
          <button 
            type="button" 
            onClick={() => removeField(field.id)}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
          >
            Remove Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormProperties;
