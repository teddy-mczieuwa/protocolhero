
import { useState, useRef } from 'react'

type FieldType = {
  id: number;
  value: string;
  inputType: string;
  label: string;
  placeholder?: string;
};

function FormBuilder() {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [fields, setFields] = useState<FieldType[]>([
    { id: 1, value: '', inputType: 'text', label: 'First Name', placeholder: 'John' },
    { id: 2, value: '', inputType: 'text', label: 'Last Name', placeholder: 'Doe' }
  ]);
  const [showFieldMenu, setShowFieldMenu] = useState(false);
  const [activeField, setActiveField] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState<string>('white');
  const [fontFamily, setFontFamily] = useState<string>('Roboto');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const addField = (type: string = 'text') => {
    const newField = { 
      id: Date.now(), // Use timestamp for unique IDs
      value: '', 
      inputType: type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: ''
    };
    setFields([...fields, newField]);
    setShowFieldMenu(false);
  };
  
  const removeField = (id: number) => {
    if (fields.length > 1) {
      const updatedFields = fields.filter(field => field.id !== id);
      setFields(updatedFields);
      if (activeField === id) {
        setActiveField(null);
      }
    }
  };
  
  // We use this function when users interact with input fields,
  // but in this design it's primarily for preview and future functionality
  const updateFieldValue = (id: number, value: string) => {
    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, value };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const handleTypeChange = (id: number, inputType: string) => {
    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, inputType };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const handleLabelChange = (id: number, label: string) => {
    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, label };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const handlePlaceholderChange = (id: number, placeholder: string) => {
    const updatedFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, placeholder };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const handleFieldClick = (id: number) => {
    setActiveField(id === activeField ? null : id);
  };

  const colorOptions = ['white', 'lightgreen', 'lightyellow', 'lightblue', 'pink', 'black'];
  
  return (
    <div className="p-4 flex flex-col md:flex-row gap-6 min-h-screen">
      {/* Left panel - Form Preview */}
      <div className="flex-1 border rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: bgColor, fontFamily }}>
        <div className="p-6">
          {/* Form Title */}
          <input 
            type="text" 
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full text-xl font-bold mb-6 border-b-2 text-gray-800 pb-2 bg-white outline-none"
          />
          
          {/* Form Fields */}
          <div className="space-y-4">
            {fields.map((field) => (
              <div 
                key={field.id} 
                className={`relative ${activeField === field.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleFieldClick(field.id)}
              >
                {showLabels && (
                  <label className="block text-gray-700 mb-1">{field.label}</label>
                )}
                <div className="flex">
                  {field.inputType === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : field.inputType === 'select' ? (
                    <select
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  ) : field.inputType === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={field.value === 'true'}
                      onChange={(e) => updateFieldValue(field.id, e.target.checked ? 'true' : 'false')}
                      className="h-5 w-5 mt-1"
                    />
                  ) : (
                    <input
                      type={field.inputType}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  <button 
                    className="ml-2 p-2 border rounded flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveField(field.id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add Field Button */}
          <div className="relative mt-6">
            <button 
              className="flex items-center justify-center w-full border-2 border-dashed border-blue-400 text-blue-500 rounded-lg py-3 hover:bg-blue-50"
              onClick={() => setShowFieldMenu(!showFieldMenu)}
            >
              <span className="mr-1 font-bold">+</span> Add New Field
            </button>
            
            {/* Field Type Menu */}
            {showFieldMenu && (
              <div 
                ref={menuRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10"
              >
                <div className="p-2">
                  <input 
                    type="text" 
                    placeholder="Search..."
                    className="w-full border rounded-lg p-2 mb-2"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto text-gray-800">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addField('text')}>Text field</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addField('button')}>Button</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addField('select')}>Dropdown</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addField('radio')}>Radio button</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addField('checkbox')}>Checkbox</div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addField('switch')}>Switch option</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right panel - Settings */}
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
            <option value="Roboto">Roboto</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
        
        <h2 className="text-xl font-bold mb-4 text-gray-700">Form Labels</h2>
        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={showLabels} 
                onChange={() => setShowLabels(!showLabels)} 
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
        {activeField !== null && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-700">Field Properties</h2>
            {fields.filter(f => f.id === activeField).map(field => (
              <div key={`field-props-${field.id}`} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={e => handleLabelChange(field.id, e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    value={field.inputType}
                    onChange={e => handleTypeChange(field.id, e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="tel">Telephone</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="select">Dropdown</option>
                    <option value="textarea">Text Area</option>
                    <option value="button">Button</option>
                    <option value="switch">Switch</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                  <input
                    type="text"
                    value={field.placeholder || ''}
                    onChange={e => handlePlaceholderChange(field.id, e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div className="pt-2">
                  <button 
                    type="button" 
                    onClick={() => removeField(field.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
                  >
                    Remove Field
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

  export default FormBuilder