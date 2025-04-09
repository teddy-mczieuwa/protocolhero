import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FormHeader from './FormHeader';
import FormPreview from './FormPreview';
import FormSettings from './FormSettings';
import FormPreviewModal from './FormPreviewModal';
import { useFormFields } from '../hooks/useFormFields';
import { useFormSettings } from '../hooks/useFormSettings';
import { v4 as uuidv4 } from 'uuid';

const FormBuilder: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  
  const togglePreviewModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };
  const {
    fields,
    activeField,
    addField,
    removeField,
    updateFieldValue,
    updateFieldType,
    updateFieldLabel,
    updateFieldPlaceholder,
    updateFieldValidation,
    updateFieldValidationMessages,
    toggleActiveField
  } = useFormFields([
    { id: uuidv4(), value: '', inputType: 'text', label: 'First Name', placeholder: 'John' },
    { id: uuidv4(), value: '', inputType: 'text', label: 'Last Name', placeholder: 'Doe' }
  ]);

  const {
    formTitle,
    setFormTitle,
    bgColor,
    setBgColor,
    fontFamily,
    setFontFamily,
    showLabels,
    toggleLabels,
    showFieldMenu,
    toggleFieldMenu,
    setShowFieldMenu,
    colorOptions,
    fontOptions
  } = useFormSettings();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 relative">
      <button 
        className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      
      <div className={`${sidebarOpen ? 'fixed inset-0 z-10 bg-gray-900 bg-opacity-80' : 'hidden'} md:block md:relative md:z-auto`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 bg-gray-100 p-4 md:p-8">
        <FormHeader togglePreviewModal={togglePreviewModal} />

        <div className="flex flex-col md:flex-row gap-6 mt-12 md:mt-0">
          <FormPreview
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            fields={fields}
            activeField={activeField}
            showLabels={showLabels}
            showFieldMenu={showFieldMenu}
            bgColor={bgColor}
            fontFamily={fontFamily}
            toggleFieldMenu={toggleFieldMenu}
            setShowFieldMenu={setShowFieldMenu}
            addField={addField}
            updateFieldValue={updateFieldValue}
            toggleActiveField={toggleActiveField}
            isPreviewModalOpen={isPreviewModalOpen}
            togglePreviewModal={togglePreviewModal}
          />

          <FormSettings
            bgColor={bgColor}
            fontFamily={fontFamily}
            showLabels={showLabels}
            colorOptions={colorOptions}
            fontOptions={fontOptions}
            activeField={activeField}
            fields={fields}
            setBgColor={setBgColor}
            setFontFamily={setFontFamily}
            toggleLabels={toggleLabels}
            updateFieldLabel={updateFieldLabel}
            updateFieldType={updateFieldType}
            updateFieldPlaceholder={updateFieldPlaceholder}
            updateFieldValidation={updateFieldValidation}
            updateFieldValidationMessages={updateFieldValidationMessages}
            removeField={removeField}
          />
        </div>
      </div>

      <FormPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        formTitle={formTitle}
        fields={fields}
        showLabels={showLabels}
        bgColor={bgColor}
        fontFamily={fontFamily}
      />
    </div>
  );
};

export default FormBuilder;
