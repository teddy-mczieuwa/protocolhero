import { FieldType } from '../types';

export const createNewField = (type: string = 'text'): FieldType => {
  return { 
    id: Date.now(), // Use timestamp for unique IDs
    value: '', 
    inputType: type,
    label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    placeholder: ''
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
