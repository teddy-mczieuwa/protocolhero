import React, { useState } from 'react';
import { FieldType, ValidationRule, ValidationMessages } from '../types';

interface FormPropertiesProps {
  activeField: number | null;
  fields: FieldType[];
  updateFieldLabel: (id: number, label: string) => void;
  updateFieldType: (id: number, inputType: string) => void;
  updateFieldPlaceholder: (id: number, placeholder: string) => void;
  removeField: (id: number) => void;
  updateFieldValidation?: (id: number, validation: ValidationRule) => void;
  updateFieldValidationMessages?: (id: number, validationMessages: ValidationMessages) => void;
}

const FormProperties: React.FC<FormPropertiesProps> = ({
  activeField,
  fields,
  updateFieldLabel,
  updateFieldType,
  updateFieldPlaceholder,
  removeField,
  updateFieldValidation = () => {}, // Default no-op function
  updateFieldValidationMessages = () => {} // Default no-op function
}) => {
  const [showValidationSettings, setShowValidationSettings] = useState(false);
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
        
        {/* Validation Settings Toggle */}
        <div className="pt-4 pb-2">
          <button
            type="button"
            onClick={() => setShowValidationSettings(!showValidationSettings)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full flex items-center justify-center"
          >
            <span>Validation Settings</span>
            <svg 
              className={`w-4 h-4 ml-2 transition-transform ${showValidationSettings ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        {/* Validation Settings Panel */}
        {showValidationSettings && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-300">
            <h3 className="text-md font-semibold mb-3 text-gray-800">Validation Rules</h3>
            
            {/* Required Field Toggle */}
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-800">Required</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="required-toggle" 
                  className="sr-only"
                  checked={field.validation?.required || false}
                  onChange={(e) => {
                    const newValidation = { ...(field.validation || {}), required: e.target.checked };
                    updateFieldValidation(field.id, newValidation);
                  }}
                />
                <label 
                  htmlFor="required-toggle"
                  className={`block overflow-hidden h-6 rounded-full ${field.validation?.required ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
                >
                  <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${field.validation?.required ? 'translate-x-5' : 'translate-x-1'}`}></span>
                </label>
              </div>
            </div>

            {/* Min/Max Length - For text, textarea, password, email, tel */}
            {['text', 'textarea', 'password', 'email', 'tel'].includes(field.inputType) && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800">Min Length</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                    value={field.validation?.minLength || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      const newValidation = { ...(field.validation || {}), minLength: value };
                      updateFieldValidation(field.id, newValidation);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800">Max Length</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                    value={field.validation?.maxLength || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      const newValidation = { ...(field.validation || {}), maxLength: value };
                      updateFieldValidation(field.id, newValidation);
                    }}
                  />
                </div>
              </div>
            )}
            
            {/* Min/Max Value - For number */}
            {field.inputType === 'number' && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800">Min Value</label>
                  <input 
                    type="number"
                    className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                    value={field.validation?.min || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      const newValidation = { ...(field.validation || {}), min: value };
                      updateFieldValidation(field.id, newValidation);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800">Max Value</label>
                  <input 
                    type="number"
                    className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                    value={field.validation?.max || ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : undefined;
                      const newValidation = { ...(field.validation || {}), max: value };
                      updateFieldValidation(field.id, newValidation);
                    }}
                  />
                </div>
              </div>
            )}
            
            {/* Pattern/Regex - For text, email, tel, password */}
            {['text', 'email', 'tel', 'password'].includes(field.inputType) && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Pattern (Regex)</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder="e.g. ^[a-zA-Z0-9]+$"
                  value={field.validation?.pattern || ''}
                  onChange={(e) => {
                    const newValidation = { ...(field.validation || {}), pattern: e.target.value || undefined };
                    updateFieldValidation(field.id, newValidation);
                  }}
                />
                <p className="text-xs text-gray-600 mt-1">Regular expression pattern for validation</p>
              </div>
            )}

            {/* Email validation - specifically for email fields */}
            {field.inputType === 'email' && (
              <div className="flex items-center mb-4">
                <input 
                  type="checkbox" 
                  id="email-validation" 
                  className="mr-2"
                  checked={field.validation?.email || false}
                  onChange={(e) => {
                    const newValidation = { ...(field.validation || {}), email: e.target.checked };
                    updateFieldValidation(field.id, newValidation);
                  }}
                />
                <label htmlFor="email-validation" className="text-sm font-medium text-gray-800">Validate Email Format</label>
              </div>
            )}

            <h3 className="text-md font-semibold mb-3 mt-6 text-gray-800">Error Messages</h3>

            {/* Required field error message */}
            {field.validation?.required && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Required Field Message</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder="This field is required"
                  value={field.validationMessages?.required || ''}
                  onChange={(e) => {
                    const newMessages = { ...(field.validationMessages || {}), required: e.target.value };
                    updateFieldValidationMessages(field.id, newMessages);
                  }}
                />
              </div>
            )}

            {/* Min length error message */}
            {field.validation?.minLength !== undefined && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Min Length Message</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder={`Minimum length is ${field.validation.minLength} characters`}
                  value={field.validationMessages?.minLength || ''}
                  onChange={(e) => {
                    const newMessages = { ...(field.validationMessages || {}), minLength: e.target.value };
                    updateFieldValidationMessages(field.id, newMessages);
                  }}
                />
              </div>
            )}

            {/* Max length error message */}
            {field.validation?.maxLength !== undefined && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Max Length Message</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder={`Maximum length is ${field.validation.maxLength} characters`}
                  value={field.validationMessages?.maxLength || ''}
                  onChange={(e) => {
                    const newMessages = { ...(field.validationMessages || {}), maxLength: e.target.value };
                    updateFieldValidationMessages(field.id, newMessages);
                  }}
                />
              </div>
            )}

            {/* Min value error message */}
            {field.validation?.min !== undefined && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Min Value Message</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder={`Minimum value is ${field.validation.min}`}
                  value={field.validationMessages?.min || ''}
                  onChange={(e) => {
                    const newMessages = { ...(field.validationMessages || {}), min: e.target.value };
                    updateFieldValidationMessages(field.id, newMessages);
                  }}
                />
              </div>
            )}

            {/* Max value error message */}
            {field.validation?.max !== undefined && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Max Value Message</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder={`Maximum value is ${field.validation.max}`}
                  value={field.validationMessages?.max || ''}
                  onChange={(e) => {
                    const newMessages = { ...(field.validationMessages || {}), max: e.target.value };
                    updateFieldValidationMessages(field.id, newMessages);
                  }}
                />
              </div>
            )}

            {/* Pattern error message */}
            {field.validation?.pattern && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Pattern Mismatch Message</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder="Value does not match the required pattern"
                  value={field.validationMessages?.pattern || ''}
                  onChange={(e) => {
                    const newMessages = { ...(field.validationMessages || {}), pattern: e.target.value };
                    updateFieldValidationMessages(field.id, newMessages);
                  }}
                />
              </div>
            )}

            {/* Email error message */}
            {field.validation?.email && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-800">Email Format Message</label>
                <input 
                  type="text" 
                  className="w-full border rounded px-3 py-2 text-sm text-gray-800"
                  placeholder="Please enter a valid email address"
                  value={field.validationMessages?.email || ''}
                  onChange={(e) => {
                    const newMessages = { ...(field.validationMessages || {}), email: e.target.value };
                    updateFieldValidationMessages(field.id, newMessages);
                  }}
                />
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4">
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
