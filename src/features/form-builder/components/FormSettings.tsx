import React from 'react';
import FormProperties from './FormProperties';
import { FieldType } from '../types';

interface FormSettingsProps {
  bgColor: string;
  fontFamily: string;
  showLabels: boolean;
  colorOptions: string[];
  fontOptions: string[];
  activeField: number | null;
  fields: FieldType[];
  setBgColor: (color: string) => void;
  setFontFamily: (font: string) => void;
  toggleLabels: () => void;
  updateFieldLabel: (id: number, label: string) => void;
  updateFieldType: (id: number, inputType: string) => void;
  updateFieldPlaceholder: (id: number, placeholder: string) => void;
  removeField: (id: number) => void;
}

const FormSettings: React.FC<FormSettingsProps> = ({
  bgColor,
  fontFamily,
  showLabels,
  colorOptions,
  fontOptions,
  activeField,
  fields,
  setBgColor,
  setFontFamily,
  toggleLabels,
  updateFieldLabel,
  updateFieldType,
  updateFieldPlaceholder,
  removeField
}) => {
  return (
    <div className="w-full md:w-80 border rounded-lg shadow-md p-6 bg-white">
      <h2 className="text-xl font-bold mb-6 text-gray-700">Background Color</h2>
      <div className="flex gap-3 mb-6">
        {colorOptions.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full ${color === 'white' ? 'border border-gray-300' : ''} ${bgColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setBgColor(color)}
          ></button>
        ))}
      </div>
      
      <h2 className="text-xl font-bold mb-4 text-gray-700">Font Family</h2>
      <div className="mb-6">
        <select 
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          {fontOptions.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>
      
      <h2 className="text-xl font-bold mb-4 text-gray-700">Form Labels</h2>
      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input 
              type="checkbox" 
              checked={showLabels} 
              onChange={toggleLabels} 
              className="sr-only" 
            />
            <div className={`block w-14 h-8 rounded-full ${showLabels ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${showLabels ? 'translate-x-6' : ''}`}></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            Turned {showLabels ? 'ON' : 'OFF'}
          </div>
        </label>
      </div>
      
      {/* Field Properties (when a field is selected) */}
      <FormProperties
        activeField={activeField}
        fields={fields}
        updateFieldLabel={updateFieldLabel}
        updateFieldType={updateFieldType}
        updateFieldPlaceholder={updateFieldPlaceholder}
        removeField={removeField}
      />
    </div>
  );
};

export default FormSettings;
