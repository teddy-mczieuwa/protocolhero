import React from 'react';
import Sidebar from './Sidebar';
import FormHeader from './FormHeader';
import FormPreview from './FormPreview';
import FormSettings from './FormSettings';
import { useFormFields } from '../hooks/useFormFields';
import { useFormSettings } from '../hooks/useFormSettings';

const FormBuilder: React.FC = () => {
  // Initialize form fields with default data
  const {
    fields,
    activeField,
    addField,
    removeField,
    updateFieldValue,
    updateFieldType,
    updateFieldLabel,
    updateFieldPlaceholder,
    toggleActiveField
  } = useFormFields([
    { id: 1, value: '', inputType: 'text', label: 'First Name', placeholder: 'John' },
    { id: 2, value: '', inputType: 'text', label: 'Last Name', placeholder: 'Doe' }
  ]);

  // Initialize form settings
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
      {/* Left sidebar - Navigation */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-8">
        <FormHeader />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Form Preview */}
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
          />

          {/* Right panel - Settings */}
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
            removeField={removeField}
          />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
