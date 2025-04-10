import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldType } from '../types';
import FormField from './FormField';
import FieldMenu from './FieldMenu';

interface FormPreviewProps {
  formTitle: string;
  setFormTitle: (title: string) => void;
  fields: FieldType[];
  activeField: string | number | null;
  showLabels: boolean;
  showFieldMenu: boolean;
  bgColor: string;
  fontFamily: string;
  toggleFieldMenu: () => void;
  setShowFieldMenu: (show: boolean) => void;
  addField: (type: string) => void;
  updateFieldValue: (id: string | number, value: string) => void;
  toggleActiveField: (id: string | number) => void;
  isPreviewModalOpen: boolean;
  togglePreviewModal: () => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({
  formTitle,
  setFormTitle,
  fields,
  activeField,
  showLabels,
  showFieldMenu,
  bgColor,
  fontFamily,
  toggleFieldMenu,
  setShowFieldMenu,
  addField,
  updateFieldValue,
  toggleActiveField,
}) => {
  const { t } = useTranslation('common');
  
  return (
    <div className="flex-1 border rounded-lg shadow-md" style={{ backgroundColor: bgColor, fontFamily }}>
      <div className="p-3 md:p-6">
        <input 
          type="text" 
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full text-lg md:text-xl font-bold mb-4 md:mb-6 border-b-2 text-gray-800 pb-2 bg-white outline-none"
        />
        
        <div className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              isActive={activeField === field.id}
              showLabels={showLabels}
              updateFieldValue={updateFieldValue}
              onFieldClick={toggleActiveField}
            />
          ))}
        </div>
        
        <div className="relative mt-6">
          <button 
            className="flex items-center justify-center w-full border-2 border-dashed border-blue-400 text-blue-500 rounded-lg py-2 md:py-3 hover:bg-blue-50"
            onClick={toggleFieldMenu}
          >
            <span className="mr-1 font-bold">+</span> {t('formBuilder.formPreview.addField')}
          </button>
          <FieldMenu show={showFieldMenu} onAddField={(type) => {
            addField(type);
            setShowFieldMenu(false);
          }} />
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
