import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Dashboard } from './pages/Dashboard';
import { AlphaIntelligence } from './pages/AlphaIntelligence';
import { Home } from './pages/Home';
import { About } from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'about' | 'alpha-intelligence'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'alpha-intelligence': return <AlphaIntelligence />;
      case 'dashboard': return <Dashboard />;
      case 'about': return <About />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer currentPage={currentPage} />
    </div>
  );
}

export default App;