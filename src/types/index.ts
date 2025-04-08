export type ValidationRule = {
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  email?: boolean;
  customRule?: string;
};

export type ValidationMessages = {
  required?: string;
  pattern?: string;
  minLength?: string;
  maxLength?: string;
  min?: string;
  max?: string;
  email?: string;
  customRule?: string;
};

export type FieldType = {
  id: number;
  value: string;
  inputType: string;
  label: string;
  placeholder?: string;
  validation?: ValidationRule;
  validationMessages?: ValidationMessages;
  isValid?: boolean;
  errorMessage?: string;
};

export type ColorOption = 'white' | 'lightgreen' | 'lightyellow' | 'lightblue' | 'pink' | 'black';

export type FontFamilyOption = 'Roboto' | 'Arial' | 'Helvetica' | 'Times New Roman' | 'Georgia';
