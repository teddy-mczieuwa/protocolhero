
import { useState } from 'react'

type FieldType = {
  id: number;
  value: string;
  inputType: string;
  label: string;
};

function FormBuilder() {
  const [fields, setFields] = useState<FieldType[]>([
    { id: 1, value: '', inputType: 'text', label: 'Field 1' }
  ]);
  
  const addField = () => {
    const newField = { 
      id: fields.length + 1, 
      value: '', 
      inputType: 'text',
      label: `Field ${fields.length + 1}`
    };
    setFields([...fields, newField]);
  };
  
  const removeField = (id: number) => {
    const updatedFields = fields.filter(field => field.id !== id);
    setFields(updatedFields);
  };
  
  const handleChange = (id: number, value: string) => {
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
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Form Builder</h2> 

      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={addField}>
        Add Field
      </button>

      <form className="space-y-4">
        {fields.map(field => (
          <div key={field.id} className="p-4 border rounded-lg flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium">Field Label:</label>
              <input
                type="text"
                value={field.label}
                onChange={e => handleLabelChange(field.id, e.target.value)}
                className="border rounded px-2 py-1"
              />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium">Field Type:</label>
              <select 
                value={field.inputType}
                onChange={e => handleTypeChange(field.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="date">Date</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="textarea">Text Area</option>
                <option value="select">Select</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium">{field.label}:</label>
              {field.inputType === 'textarea' ? (
                <textarea
                  value={field.value}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : field.inputType === 'select' ? (
                <select
                  value={field.value}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="border rounded px-2 py-1"
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
                  onChange={e => handleChange(field.id, e.target.checked ? 'true' : 'false')}
                  className="h-4 w-4"
                />
              ) : (
                <input
                  type={field.inputType}
                  value={field.value}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="border rounded px-2 py-1"
                />
              )}
            </div>
            
            <button 
              type="button" 
              onClick={() => removeField(field.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded self-end"
            >
              Remove Field
            </button>
          </div>
        ))}
      </form>

      {/* {fields.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Form Preview</h3>
          <div className="space-y-3">
            {fields.map(field => (
              <div key={`preview-${field.id}`} className="flex items-center gap-2">
                <label className="font-medium">{field.label}:</label>
                {field.inputType === 'textarea' ? (
                  <textarea
                    value={field.value}
                    readOnly
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : field.inputType === 'select' ? (
                  <select
                    value={field.value}
                    disabled
                    className="border rounded px-2 py-1"
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
                    readOnly
                    className="h-4 w-4"
                  />
                ) : (
                  <input
                    type={field.inputType}
                    value={field.value}
                    readOnly
                    className="border rounded px-2 py-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

  export default FormBuilder