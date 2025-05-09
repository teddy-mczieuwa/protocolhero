import FormBuilder from './components/FormBuilder';
import LanguageSwitcher from './components/LanguageSwitcher';

import './i18n/i18n';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-800 text-white p-3 flex justify-end">
        <LanguageSwitcher />
      </div>
      <FormBuilder />
    </div>
  );
}

export default App;