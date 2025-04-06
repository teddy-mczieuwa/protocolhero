import React from 'react';

const FormHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm breadcrumbs text-gray-600">
        <a href="#" className="text-blue-500 hover:underline">My Forms</a>
        <span className="mx-2">&gt;</span>
        <span>Create New Form</span>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md">
        Publish Form
      </button>
    </div>
  );
};

export default FormHeader;
