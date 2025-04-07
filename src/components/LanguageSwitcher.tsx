import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium">
        {t('formBuilder.language.title')}:
      </span>
      <button
        className={`px-2 py-1 text-sm rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
        onClick={() => changeLanguage('en')}
      >
        {t('formBuilder.language.english')}
      </button>
      <button
        className={`px-2 py-1 text-sm rounded ${i18n.language === 'de' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
        onClick={() => changeLanguage('de')}
      >
        {t('formBuilder.language.german')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
