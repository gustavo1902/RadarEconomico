import { Activity, Menu, X, Home, BarChart2, Info } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'dashboard' | 'about') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Função auxiliar para fechar o menu ao clicar
  const handleNavigation = (page: 'home' | 'dashboard' | 'about') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navItemClass = (page: string) => 
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      currentPage === page 
        ? 'bg-zinc-900 text-white shadow-md' 
        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
    }`;

  // Estilo dos botões mobile
  const mobileNavItemClass = (page: string) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
      currentPage === page
        ? 'bg-zinc-100 text-zinc-900'
        : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
    }`;

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => handleNavigation('home')}>
            <div className="bg-zinc-900 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-zinc-900 tracking-tight">RadarEconômico</span>
          </div>

          {/* Menu Desktop  */}
          <nav className="hidden md:flex space-x-2">
            <button onClick={() => onNavigate('home')} className={navItemClass('home')}>Início</button>
            <button onClick={() => onNavigate('dashboard')} className={navItemClass('dashboard')}>Dashboard</button>
            <button onClick={() => onNavigate('about')} className={navItemClass('about')}>Sobre</button>
          </nav>

          {/* Botão Hamburger */}
          <button 
            className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* IMPLEMENTAÇÃO DO MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-zinc-200 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <div className="p-4 space-y-2">
            <button 
              onClick={() => handleNavigation('home')} 
              className={mobileNavItemClass('home')}
            >
              <Home className="w-5 h-5" />
              Início
            </button>
            
            <button 
              onClick={() => handleNavigation('dashboard')} 
              className={mobileNavItemClass('dashboard')}
            >
              <BarChart2 className="w-5 h-5" />
              Dashboard
            </button>
            
            <button 
              onClick={() => handleNavigation('about')} 
              className={mobileNavItemClass('about')}
            >
              <Info className="w-5 h-5" />
              Sobre o Projeto
            </button>
          </div>
        </div>
      )}
    </header>
  );
}