import React from 'react';
import { FieldType } from '../types';
import Modal from './Modal';

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
            {fields.map((field) => (
              <div key={field.id} className="mb-4">
                {showLabels && (
                  <label className="block text-gray-700 text-sm md:text-base mb-1">{field.label}</label>
                )}
                <div>
                  {field.inputType === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={() => {}} // Read-only in preview
                      className="border rounded py-2 px-3 text-base w-full"
                    />
                  ) : field.inputType === 'select' ? (
                    <select
                      value={field.value}
                      onChange={() => {}} // Read-only in preview
                      className="border rounded py-2 px-3 text-base w-full"
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
                      onChange={() => {}} // Read-only in preview
                      className="h-5 w-5 mt-1"
                    />
                  ) : field.inputType === 'radio' ? (
                    <div className="flex flex-col space-y-3 w-full">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`preview-${field.id}-yes`}
                          name={`preview-radio-group-${field.id}`}
                          value="yes"
                          checked={field.value === 'yes'}
                          onChange={() => {}} // Read-only in preview
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
                          onChange={() => {}} // Read-only in preview
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
                      onChange={() => {}} // Read-only in preview
                      className="border rounded py-2 px-3 text-base w-full"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Submit Button */}
          <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FormPreviewModal;
