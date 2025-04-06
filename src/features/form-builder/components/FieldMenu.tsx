import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface FieldMenuProps {
  show: boolean;
  onAddField: (type: string) => void;
}

const FieldMenu: React.FC<FieldMenuProps> = ({ show, onAddField }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('common');

  if (!show) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10"
    >
      <div className="p-2">
        <input 
          type="text" 
          placeholder={t('formBuilder.searchFields', 'Search...')}
          className="w-full border rounded-lg p-2 mb-2"
        />
      </div>
      <div className="max-h-60 overflow-y-auto text-gray-800">
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('text')}>{t('formBuilder.fieldTypes.text')}</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('email')}>{t('formBuilder.fieldTypes.email')}</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('number')}>{t('formBuilder.fieldTypes.number')}</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('textarea')}>{t('formBuilder.fieldTypes.textarea')}</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('select')}>{t('formBuilder.fieldTypes.select')}</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('radio')}>{t('formBuilder.fieldTypes.radio')}</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('checkbox')}>{t('formBuilder.fieldTypes.checkbox')}</div>
      </div>
    </div>
  );
};

export default FieldMenu;
