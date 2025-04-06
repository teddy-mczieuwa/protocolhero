import React, { useRef } from 'react';

interface FieldMenuProps {
  show: boolean;
  onAddField: (type: string) => void;
}

const FieldMenu: React.FC<FieldMenuProps> = ({ show, onAddField }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  if (!show) return null;

  return (
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
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('text')}>Text field</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('button')}>Button</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('select')}>Dropdown</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('radio')}>Radio button</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('checkbox')}>Checkbox</div>
        <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => onAddField('switch')}>Switch option</div>
      </div>
    </div>
  );
};

export default FieldMenu;
