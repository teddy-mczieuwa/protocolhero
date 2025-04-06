import { useState } from 'react';
import { FieldType } from '../types';
import { createNewField, updateField, removeFieldById } from '../utils/fieldUtils';

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
    setFields(updateField(fields, id, { value }));
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

  const toggleActiveField = (id: number) => {
    setActiveField(id === activeField ? null : id);
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
    toggleActiveField
  };
};
