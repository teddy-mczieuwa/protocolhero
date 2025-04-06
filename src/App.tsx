import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FormBuilder from './components/FormBuilder'

function App() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">  
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer" className="hover:scale-105 transition-transform">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:scale-105 transition-transform">
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </header>
        
        {/* Main Content */}
        <main className="w-full bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
          <FormBuilder />
        </main>
        
        <footer className="w-full mt-8 text-center text-slate-600 dark:text-slate-400">
          <p>Click on the Vite and React logos to learn more about these technologies.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
