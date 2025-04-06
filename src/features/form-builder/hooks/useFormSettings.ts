import { useState } from 'react';
import { ColorOption, FontFamilyOption } from '../types';

export const useFormSettings = () => {
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [bgColor, setBgColor] = useState<string>('white');
  const [fontFamily, setFontFamily] = useState<string>('Roboto');
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showFieldMenu, setShowFieldMenu] = useState(false);

  const toggleFieldMenu = () => {
    setShowFieldMenu(!showFieldMenu);
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
  };

  const colorOptions: ColorOption[] = ['white', 'lightgreen', 'lightyellow', 'lightblue', 'pink', 'black'];

  const fontOptions: FontFamilyOption[] = ['Roboto', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia'];

  return {
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
  };
};
