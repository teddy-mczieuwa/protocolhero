import React from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { t } = useTranslation('common');
  return (
    <div className="w-full md:w-60 h-screen overflow-y-auto bg-gray-900 text-white">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-semibold">{t('formBuilder.title')}</h1>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-white md:hidden p-1 hover:bg-gray-800 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <nav className="mt-6">
        <div className="px-4 py-3 bg-blue-800 border-l-4 border-blue-500">
          <span className="text-white">{t('formBuilder.sidebar.dashboard')}</span>
        </div>
        <div className="px-4 py-3">
          <span className="text-gray-300">{t('formBuilder.sidebar.analytics', 'Analytics')}</span>
        </div>
        <div className="px-4 py-3">
          <span className="text-gray-300">{t('formBuilder.sidebar.templates')}</span>
        </div>
        <div className="px-4 py-3">
          <span className="text-gray-300">{t('formBuilder.sidebar.settings')}</span>
        </div>
        <div className="mt-16 px-4 py-3">
          <span className="text-gray-300">{t('formBuilder.sidebar.profile', 'My Profile')}</span>
        </div>
        <div className="px-4 py-1">
          <span className="text-xs text-gray-500">{t('formBuilder.sidebar.logout', 'Logout')}</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
