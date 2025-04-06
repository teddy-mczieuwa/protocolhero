import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-60 bg-gray-900 text-white">
      <div className="p-6 flex items-center space-x-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
        <h1 className="text-xl font-semibold">Form Builder</h1>
      </div>
      <nav className="mt-6">
        <div className="px-4 py-3 bg-blue-800 border-l-4 border-blue-500">
          <span className="text-white">My Forms</span>
        </div>
        <div className="px-4 py-3">
          <span className="text-gray-300">Analytics</span>
        </div>
        <div className="px-4 py-3">
          <span className="text-gray-300">Knowledge Base</span>
        </div>
        <div className="px-4 py-3">
          <span className="text-gray-300">Help & Support</span>
        </div>
        <div className="mt-16 px-4 py-3">
          <span className="text-gray-300">My Profile</span>
        </div>
        <div className="px-4 py-1">
          <span className="text-xs text-gray-500">Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
