import { Github, Linkedin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Lado Esquerdo: Marca e Copyright na mesma linha */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span className="font-bold text-zinc-900 text-sm">RadarEconômico</span>
            <span className="hidden md:inline text-zinc-300">|</span>
            <p className="text-zinc-500 text-xs">
              Dados oficiais do Banco Central do Brasil (SGS).
            </p>
          </div>
          
          {/* Lado Direito: Links Sociais compactos */}
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/gustavo1902" 
              target="_blank" 
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/gustavo-morais-costa/" 
              target="_blank" 
              rel="noreferrer"
              className="text-zinc-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}