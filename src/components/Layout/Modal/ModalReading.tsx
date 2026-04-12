import { X, BookOpen, Clock} from 'lucide-react';

interface ModalReadingProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    subtitle: string;
    tag: string;
    content: string[];
  } | null;
}

export function ModalReading({ isOpen, onClose, article }: ModalReadingProps) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      {/* Overlay com Blur */}
      <div 
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md" 
        onClick={onClose}
      ></div>

      {/* Janela do Modal */}
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col border border-zinc-200 animate-in zoom-in-95 duration-300">
        
        {/* Header do Modal */}
        <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 p-2 rounded-lg">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-0.5">
                {article.tag} • Guia Técnico
              </span>
              <h3 className="text-xl font-bold text-zinc-900 leading-none">{article.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-full text-zinc-400 hover:text-zinc-900 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo do Artigo */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 text-zinc-400 text-xs font-medium mb-8">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 1 min de leitura</span>
              <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
              <span>Educação Financeira</span>
            </div>

            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-zinc-600 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}

            <div className="bg-zinc-50 border border-zinc-100 p-6 rounded-2xl mt-12 italic text-zinc-500 text-sm">
              "Entender a macroeconomia é o primeiro passo para proteger seu patrimônio contra as oscilações de mercado."
            </div>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="px-8 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors shadow-lg"
          >
            Concluir Leitura
          </button>
        </div>
      </div>
    </div>
  );
}