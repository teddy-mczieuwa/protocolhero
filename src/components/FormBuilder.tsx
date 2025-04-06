
import { useState } from 'react'
function FormBuilder() {
  const [fields, setFields] = useState([{ id: 1, value: '' }]);
  
  const addField = () => {
    const newField = { id: fields.length + 1, value: '' };
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
  
  return (
    <div>
    <h2>Form Builder</h2>
    <button onClick={addField}>Add Field</button>
    <form>
    {fields.map(field => (
      <div key={field.id}>
        <input
          type= "text"
          value={field.value}
          onChange={e => handleChange(field.id, e.target.value)}
        />
    <button type="button" onClick={() => removeField(field.id)}>Remove</button>
    </div>
    ))}
    </form>
    </div>
  );
}

  export default FormBuilder