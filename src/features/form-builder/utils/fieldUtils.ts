import { FieldType, ValidationRule, ValidationMessages } from '../types';

export const createNewField = (type: string = 'text'): FieldType => {
  // Default validation based on input type
  let validation: ValidationRule | undefined;
  let validationMessages: ValidationMessages | undefined;
  
  switch(type) {
    case 'email':
      validation = { email: true };
      validationMessages = { email: 'Please enter a valid email address' };
      break;
    case 'number':
      validation = {};
      validationMessages = {};
      break;
    case 'tel':
      validation = { pattern: '^[\\d\\+\\-\\(\\)\\s]*$' };
      validationMessages = { pattern: 'Please enter a valid phone number' };
      break;
    default:
      validation = {};
      validationMessages = {};
  }
  
  return { 
    id: Date.now(), // Use timestamp for unique IDs
    value: '', 
    inputType: type,
    label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    placeholder: '',
    validation,
    validationMessages,
    isValid: true
  };
};

export const updateField = (
  fields: FieldType[], 
  fieldId: number, 
  updateProps: Partial<FieldType>
): FieldType[] => {
  return fields.map(field => {
    if (field.id === fieldId) {
      return { ...field, ...updateProps };
    }
    return field;
  });
};

export const removeFieldById = (fields: FieldType[], fieldId: number): FieldType[] => {
  return fields.filter(field => field.id !== fieldId);
};

/**
 * Validates a field based on its validation rules and returns an updated field with validation results
 */
export const validateField = (field: FieldType): FieldType => {
  if (!field.validation) return { ...field, isValid: true };
  
  const { value } = field;
  const validation = field.validation;
  const messages = field.validationMessages || {};
  
  // Required field validation
  if (validation.required && !value.trim()) {
    return {
      ...field,
      isValid: false,
      errorMessage: messages.required || 'This field is required'
    };
  }

  // Skip other validations if field is empty and not required
  if (!value.trim()) {
    return { ...field, isValid: true, errorMessage: undefined };
  }
  
  // Email validation
  if (validation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return {
      ...field,
      isValid: false,
      errorMessage: messages.email || 'Please enter a valid email address'
    };
  }
  
  // Pattern validation
  if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
    return {
      ...field,
      isValid: false,
      errorMessage: messages.pattern || 'Value does not match the required pattern'
    };
  }
  
  // Min length validation
  if (validation.minLength !== undefined && value.length < validation.minLength) {
    return {
      ...field,
      isValid: false,
      errorMessage: messages.minLength || `Minimum length is ${validation.minLength} characters`
    };
  }
  
  // Max length validation
  if (validation.maxLength !== undefined && value.length > validation.maxLength) {
    return {
      ...field,
      isValid: false,
      errorMessage: messages.maxLength || `Maximum length is ${validation.maxLength} characters`
    };
  }
  
  // Min value validation for numbers
  if (field.inputType === 'number' && validation.min !== undefined) {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < validation.min) {
      return {
        ...field,
        isValid: false,
        errorMessage: messages.min || `Minimum value is ${validation.min}`
      };
    }
  }
  
  // Max value validation for numbers
  if (field.inputType === 'number' && validation.max !== undefined) {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue > validation.max) {
      return {
        ...field,
        isValid: false,
        errorMessage: messages.max || `Maximum value is ${validation.max}`
      };
    }
  }
  
  // Custom rule validation (for future extensions)
  if (validation.customRule && typeof validation.customRule === 'string') {
    try {
      // This is a simple implementation that assumes the customRule is a regex pattern string
      if (!new RegExp(validation.customRule).test(value)) {
        return {
          ...field,
          isValid: false,
          errorMessage: messages.customRule || 'Value does not match custom validation'
        };
      }
    } catch (error) {
      console.error('Invalid custom validation rule:', error);
    }
  }
  
  // If all validations pass
  return { ...field, isValid: true, errorMessage: undefined };
};

/**
 * Validates all fields in a form
 */
export const validateForm = (fields: FieldType[]): FieldType[] => {
  return fields.map(validateField);
};

/**
 * Checks if all fields in a form are valid
 */
export const isFormValid = (fields: FieldType[]): boolean => {
  return fields.every(field => field.isValid !== false);
};
