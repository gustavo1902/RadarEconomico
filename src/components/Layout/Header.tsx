import { Activity, Menu, X, Home, BarChart2, Info, Zap, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'dashboard' | 'alpha-intelligence' | 'academy' | 'about') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (page: any) => {
    window.scrollTo(0, 0);
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  // Lógica de Adaptação de Cor
  const isHome = currentPage === 'home';
  const isDarkText = !isHome && !scrolled;

  const navItemClass = (page: string) => {
    const isActive = currentPage === page;
    
    if (isDarkText) {
      return `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
        isActive 
          ? 'bg-zinc-900 text-white shadow-md' 
          : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
      }`;
    }

    return `px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
      isActive 
        ? 'bg-white text-zinc-900 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
        : 'text-zinc-400 hover:text-white hover:bg-white/10'
    }`;
  };

  const mobileNavItemClass = (page: string) =>
    `flex items-center gap-4 w-full px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
      currentPage === page
        ? 'bg-white text-zinc-900'
        : 'text-zinc-400 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${
      scrolled ? 'bg-zinc-950/90 backdrop-blur-xl border-white/10 py-2' : 'bg-transparent border-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo Dinâmico */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleNavigation('home')}>
            <div className={`p-1.5 rounded-lg group-hover:scale-105 transition-all duration-300 ${
              isDarkText ? 'bg-zinc-900' : 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
            }`}>
                <Activity className={`w-5 h-5 ${isDarkText ? 'text-white' : 'text-zinc-950'}`} />
            </div>
            <span className={`text-lg font-black tracking-tighter transition-colors duration-300 ${
              isDarkText ? 'text-zinc-900' : 'text-white'
            }`}>
              Radar<span className="font-light">Econômico</span>
            </span>
          </div>

          {/* Menu Desktop Dinâmico */}
          <nav className={`hidden md:flex space-x-1 p-1.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
            isDarkText ? 'bg-white/80 border-zinc-200 shadow-sm' : 'bg-zinc-900/50 border-white/5'
          }`}>
            <button onClick={() => handleNavigation('home')} className={navItemClass('home')}>Início</button>
            <button onClick={() => handleNavigation('dashboard')} className={navItemClass('dashboard')}>Dashboard</button>
            <button onClick={() => handleNavigation('alpha-intelligence')} className={navItemClass('alpha-intelligence')}>Inteligência Alfa</button>
            <button onClick={() => handleNavigation('academy')} className={navItemClass('academy')}>Academy</button>
            <button onClick={() => handleNavigation('about')} className={navItemClass('about')}>Sobre</button>
          </nav>

          {/* Botão Sanduíche Mobile Dinâmico */}
          <button 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isDarkText ? 'text-zinc-900 hover:bg-zinc-200' : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Fullscreen Dark */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-zinc-950/95 backdrop-blur-2xl border-t border-white/10 animate-in slide-in-from-top-5 duration-300 overflow-y-auto">
          <div className="p-6 space-y-3">
            <button onClick={() => handleNavigation('home')} className={mobileNavItemClass('home')}>
              <Home className="w-5 h-5" /> Início
            </button>
            <button onClick={() => handleNavigation('dashboard')} className={mobileNavItemClass('dashboard')}>
              <BarChart2 className="w-5 h-5" /> Dashboard Histórico
            </button>
            <button onClick={() => handleNavigation('alpha-intelligence')} className={mobileNavItemClass('alpha-intelligence')}>
              <Zap className="w-5 h-5" /> Inteligência Alfa
            </button>
            <button onClick={() => handleNavigation('academy')} className={mobileNavItemClass('academy')}>
              <BookOpen className="w-5 h-5" /> Academy
            </button>
            <button onClick={() => handleNavigation('about')} className={mobileNavItemClass('about')}>
              <Info className="w-5 h-5" /> Sobre o Projeto
            </button>
          </div>
        </div>
      )}
    </header>
  );
}