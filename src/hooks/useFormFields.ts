import { useState } from 'react';
import { FieldType, ValidationRule, ValidationMessages } from '../types';
import { createNewField, updateField, removeFieldById, validateField, validateForm, isFormValid } from '../utils/fieldUtils';

export const useFormFields = (initialFields: FieldType[] = []) => {
  const [fields, setFields] = useState<FieldType[]>(initialFields);
  const [activeField, setActiveField] = useState<string | number | null>(null);
  
  const addField = (type: string = 'text') => {
    const newField = createNewField(type);
    setFields([...fields, newField]);
    return newField;
  };
  
  const removeField = (id: string | number) => {
    if (fields.length > 1) {
      const updatedFields = removeFieldById(fields, id);
      setFields(updatedFields);
      if (activeField === id) {
        setActiveField(null);
      }
    }
  };
  
  const updateFieldValue = (id: string | number, value: string) => {
    const updatedFields = updateField(fields, id, { value });
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

  const updateFieldType = (id: string | number, inputType: string) => {
    setFields(updateField(fields, id, { inputType }));
  };

  const updateFieldLabel = (id: string | number, label: string) => {
    setFields(updateField(fields, id, { label }));
  };

  const updateFieldPlaceholder = (id: string | number, placeholder: string) => {
    setFields(updateField(fields, id, { placeholder }));
  };
  
  const updateFieldValidation = (id: string | number, validation: ValidationRule) => {
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
  
  const updateFieldValidationMessages = (id: string | number, validationMessages: ValidationMessages) => {
    const updatedFields = updateField(fields, id, { validationMessages });
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

  const toggleActiveField = (id: string | number) => {
    setActiveField(id === activeField ? null : id);
  };

  const validateAllFields = () => {
    setFields(validateForm(fields));
  };
  
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
