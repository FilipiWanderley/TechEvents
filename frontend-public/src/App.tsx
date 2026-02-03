import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { HelpPage } from './pages/HelpPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-blue-900 tracking-tight hover:text-blue-700 transition-colors">
                  TechEvents
                </Link>
              </div>
              
              {/* Navigation / Actions */}
              <nav className="flex items-center space-x-4">
                <a 
                  href="http://localhost:4200" 
                  target="_self"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Organizar
                </a>
                <Link 
                  to="/help" 
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Ajuda
                </Link>
                <a 
                  href="http://localhost:4200"
                  target="_self"
                  className="ml-4 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Login
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
               <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">TechEvents</span>
               </div>
               <p className="text-gray-400 text-sm">
                 &copy; 2024 TechEvents. Todos os direitos reservados.
               </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
