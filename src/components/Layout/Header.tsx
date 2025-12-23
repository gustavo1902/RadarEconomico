import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'dashboard' | 'about') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItemClass = (page: string) => 
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      currentPage === page 
        ? 'bg-zinc-900 text-white shadow-md' 
        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
    }`;

  return (
    // Backdrop blur para efeito de vidro
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="bg-zinc-900 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-zinc-900 tracking-tight">RadarEconômico</span>
          </div>

          <nav className="hidden md:flex space-x-2">
            <button onClick={() => onNavigate('home')} className={navItemClass('home')}>Início</button>
            <button onClick={() => onNavigate('dashboard')} className={navItemClass('dashboard')}>Dashboard</button>
            <button onClick={() => onNavigate('about')} className={navItemClass('about')}>Sobre</button>
          </nav>

          <button className="md:hidden p-2 text-zinc-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Menu Mobile omitido para brevidade, manter lógica original se necessário */}
    </header>
  );
}