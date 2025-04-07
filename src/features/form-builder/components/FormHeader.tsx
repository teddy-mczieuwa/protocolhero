import React from 'react';
import { useTranslation } from 'react-i18next';

const FormHeader: React.FC = () => {
  const { t } = useTranslation('common');
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pt-10 md:pt-0">
      <div className="text-xs sm:text-sm breadcrumbs text-gray-600 mb-2 sm:mb-0">
        <a href="#" className="text-blue-500 hover:underline">My Forms</a>
        <span className="mx-2">&gt;</span>
        <span>{t('formBuilder.header.title')}</span>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white rounded-md">
        {t('formBuilder.buttons.publish')}
      </button>
    </div>
  );
};

export default FormHeader;
