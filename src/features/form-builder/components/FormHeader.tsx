import React from 'react';
import { useTranslation } from 'react-i18next';

const FormHeader: React.FC = () => {
  const { t } = useTranslation('common');
  
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm breadcrumbs text-gray-600">
        <a href="#" className="text-blue-500 hover:underline">My Forms</a>
        <span className="mx-2">&gt;</span>
        <span>{t('formBuilder.header.title')}</span>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md">
        {t('formBuilder.buttons.save')}
      </button>
    </div>
  );
};

export default FormHeader;
