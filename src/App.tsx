import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { About } from './pages/About';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'about'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'dashboard': return <Dashboard />;
      case 'about': return <About />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* 3. flex-grow faz o conteúdo ocupar todo o espaço disponível, empurrando o footer para baixo */}
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;