import React, { useState } from 'react';
import { FieldType } from '../types';
import Modal from './Modal';
import { useTranslation } from 'react-i18next';

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formTitle: string;
  fields: FieldType[];
  showLabels: boolean;
  bgColor: string;
  fontFamily: string;
}

const FormPreviewModal: React.FC<FormPreviewModalProps> = ({
  isOpen,
  onClose,
  formTitle,
  fields,
  showLabels,
  bgColor,
  fontFamily
}) => {
  const { t } = useTranslation('common');
  const [modalFields, setModalFields] = useState<FieldType[]>(fields);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);
  
  // Update modal fields when props change (when modal opens/closes)
  React.useEffect(() => {
    setModalFields(fields);
    setFormSubmitted(false);
    setFormIsValid(true);
  }, [fields, isOpen]);
  
  const updateFieldValue = (id: number, value: string) => {
    setModalFields(prevFields => 
      prevFields.map(field => 
        field.id === id 
          ? { ...field, value, isValid: undefined, errorMessage: '' } 
          : field
      )
    );
    
    // Clear form error when user makes changes
    if (formSubmitted) {
      setFormIsValid(true);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Form Preview">
      <div className="w-full" style={{ backgroundColor: bgColor, fontFamily }}>
        <div className="p-6">
          {/* Form Title */}
          <h2 className="text-xl font-bold mb-6 border-b-2 text-gray-800 pb-2">
            {formTitle}
          </h2>
          
          {/* Form Fields */}
          <div className="space-y-4">
            {modalFields.map((field) => (
              <div key={field.id} className="mb-4">
                {showLabels && (
                  <label className="block text-gray-700 text-sm md:text-base mb-1">
                    {field.label}
                    {field.validation?.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                )}
                <div>
                  {field.inputType === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      className={`border rounded py-2 px-3 text-base w-full ${field.isValid === false ? 'border-red-500' : ''}`}
                    />
                  ) : field.inputType === 'select' ? (
                    <select
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      className={`border rounded py-2 px-3 text-base w-full ${field.isValid === false ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select an option</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  ) : field.inputType === 'checkbox' ? (
                    <div className="flex items-center">
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
                    <div className="flex flex-col space-y-3 w-full">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`preview-${field.id}-yes`}
                          name={`preview-radio-group-${field.id}`}
                          value="yes"
                          checked={field.value === 'yes'}
                          onChange={(e) => updateFieldValue(field.id, e.target.value)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor={`preview-${field.id}-yes`} className="text-base font-medium">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`preview-${field.id}-no`}
                          name={`preview-radio-group-${field.id}`}
                          value="no"
                          checked={field.value === 'no'}
                          onChange={(e) => updateFieldValue(field.id, e.target.value)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor={`preview-${field.id}-no`} className="text-base font-medium">No</label>
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field.inputType}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      className={`border rounded py-2 px-3 text-base w-full ${field.isValid === false ? 'border-red-500' : ''}`}
                    />
                  )}
                  
                  {field.isValid === false && field.errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm mt-2 px-3 py-2 rounded-md flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <span>{field.errorMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Form Error Message */}
          {formSubmitted && !formIsValid && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm mb-3 px-3 py-2 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <span>{t('formBuilder.validation.formError')}</span>
            </div>
          )}
          
          {/* Submit Button */}
          <button 
            onClick={() => {
              setFormSubmitted(true);
              
              // Validate all fields
              const updatedFields = modalFields.map(field => {
                let isValid = true;
                let errorMessage = '';
                
                // Check if required fields have values
                if (field.validation?.required && (!field.value || field.value.trim() === '')) {
                  isValid = false;
                  errorMessage = t('formBuilder.validation.required');
                }
                
                // Email validation
                if (field.inputType === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                  isValid = false;
                  errorMessage = t('formBuilder.validation.invalidEmail');
                }
                
                // Number validation
                if (field.inputType === 'number' && field.value && !/^\d+$/.test(field.value)) {
                  isValid = false;
                  errorMessage = t('formBuilder.validation.invalidNumber');
                }
                
                return {
                  ...field,
                  isValid: isValid ? undefined : false,
                  errorMessage: errorMessage
                };
              });
              
              // Update fields with validation results
              setModalFields(updatedFields);
              
              // Check if all fields are valid
              const allValid = updatedFields.every(field => field.isValid !== false);
              setFormIsValid(allValid);
              
              // If form is valid, show success message or further action
              if (allValid) {
                // Here you'd typically submit the form data
                alert(t('formBuilder.validation.formSuccess'));
              }
            }}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FormPreviewModal;
