import { useState } from 'react';
import { FieldType, ValidationRule, ValidationMessages } from '../types';
import { createNewField, updateField, removeFieldById, validateField, validateForm, isFormValid } from '../utils/fieldUtils';

export const useFormFields = (initialFields: FieldType[] = []) => {
  const [fields, setFields] = useState<FieldType[]>(initialFields);
  const [activeField, setActiveField] = useState<number | null>(null);
  
  const addField = (type: string = 'text') => {
    const newField = createNewField(type);
    setFields([...fields, newField]);
    return newField;
  };
  
  const removeField = (id: number) => {
    if (fields.length > 1) {
      const updatedFields = removeFieldById(fields, id);
      setFields(updatedFields);
      if (activeField === id) {
        setActiveField(null);
      }
    }
  };
  
  const updateFieldValue = (id: number, value: string) => {
    // Update field value first
    const updatedFields = updateField(fields, id, { value });
    // Then validate the updated field
    const fieldToValidate = updatedFields.find(field => field.id === id);
    if (fieldToValidate) {
      const validatedField = validateField(fieldToValidate);
      setFields(updateField(updatedFields, id, { 
        isValid: validatedField.isValid, 
        errorMessage: validatedField.errorMessage 
      }));
    } else {
      setFields(updatedFields);
    }
  };

  const updateFieldType = (id: number, inputType: string) => {
    setFields(updateField(fields, id, { inputType }));
  };

  const updateFieldLabel = (id: number, label: string) => {
    setFields(updateField(fields, id, { label }));
  };

  const updateFieldPlaceholder = (id: number, placeholder: string) => {
    setFields(updateField(fields, id, { placeholder }));
  };
  
  const updateFieldValidation = (id: number, validation: ValidationRule) => {
    const updatedFields = updateField(fields, id, { validation });
    const fieldToValidate = updatedFields.find(field => field.id === id);
    if (fieldToValidate) {
      const validatedField = validateField(fieldToValidate);
      setFields(updateField(updatedFields, id, { 
        isValid: validatedField.isValid, 
        errorMessage: validatedField.errorMessage 
      }));
    } else {
      setFields(updatedFields);
    }
  };
  
  const updateFieldValidationMessages = (id: number, validationMessages: ValidationMessages) => {
    setFields(updateField(fields, id, { validationMessages }));
  };

  const toggleActiveField = (id: number) => {
    setActiveField(id === activeField ? null : id);
  };

  // Validate all form fields
  const validateAllFields = () => {
    setFields(validateForm(fields));
  };
  
  // Check if form is valid
  const checkFormValidity = () => {
    return isFormValid(fields);
  };
  
  return {
    fields,
    activeField,
    addField,
    removeField,
    updateFieldValue,
    updateFieldType,
    updateFieldLabel,
    updateFieldPlaceholder,
    updateFieldValidation,
    updateFieldValidationMessages,
    toggleActiveField,
    validateAllFields,
    isFormValid: checkFormValidity
  };
};
