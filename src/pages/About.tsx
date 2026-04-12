import { Database, Zap, Github, Terminal, ArrowUpRight } from 'lucide-react';

export function About() {
  return (
    <div className="pt-32 pb-20 bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="mb-16 border-b border-zinc-200 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 shadow-sm">
              <Terminal className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Sobre a Plataforma</h1>
          </div>
          <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
            O Radar Econômico é uma arquitetura de dados híbrida construída para democratizar o acesso à informação financeira de alta qualidade.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          
          {/* Coluna Principal */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
                Arquitetura e Propósito
              </h2>
              <div className="space-y-6 text-zinc-600 leading-relaxed text-sm">
                <p>
                  O projeto nasceu da necessidade de modernizar a visualização de dados macroeconômicos brasileiros. O mercado hoje é dividido entre terminais caros voltados para fundos de investimento e plataformas simplistas demais para o investidor pessoa física.
                </p>
                <p>
                  Desenvolvemos uma camada de agregação que atua em duas frentes independentes:
                </p>
                <ul className="space-y-4 mt-4">
                  <li className="flex gap-3">
                    <Database className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-zinc-900 font-semibold block mb-1">Módulo Histórico (Integração BCB)</strong>
                      Consome dados oficiais via API do Sistema Gerenciador de Séries Temporais (SGS), realizando cache e transformação de dados na borda (Edge).
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-zinc-900 font-semibold block mb-1">Módulo Preditivo (AlphaPred)</strong>
                      Pipeline em Python automatizado via GitHub Actions que coleta probabilidades implícitas de mercados de aposta (Polymarket/Kalshi) e calcula o desvio padrão contra modelos internos.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Informações e Repositório */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-400">
                System Status
              </h3>
              <div className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-xl border border-zinc-700">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-emerald-400">Operacional & Online</span>
              </div>
            </div>
            
            <div className="bg-white border border-zinc-200 rounded-[2rem] p-8">
              <h3 className="font-bold text-zinc-900 mb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-400">Código Aberto</h3>
              <div className="space-y-3">
                <a href="https://github.com/gustavo1902/RadarEconomico" target='_blank' rel="noreferrer" className="group flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 hover:border-zinc-200 transition-all">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900" />
                    <span className="text-sm font-semibold text-zinc-600 group-hover:text-zinc-900">Radar Frontend</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
                
                <a href="https://github.com/gustavo1902/AlphaPred" target='_blank' rel="noreferrer" className="group flex items-center justify-between p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 hover:border-zinc-200 transition-all">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900" />
                    <span className="text-sm font-semibold text-zinc-600 group-hover:text-zinc-900">Pipeline AlphaPred</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}