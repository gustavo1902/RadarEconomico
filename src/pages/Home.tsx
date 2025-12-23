import { useState } from 'react';
import { ArrowRight, BarChart3, BookOpen, ShieldCheck, X, Newspaper } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../components/ui/Card';

interface HomeProps {
  onNavigate: (page: 'dashboard') => void;
}

const MOCK_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 550 },
  { name: 'Abr', value: 480 },
  { name: 'Mai', value: 690 },
  { name: 'Jun', value: 650 },
  { name: 'Jul', value: 800 },
];

export function Home({ onNavigate }: HomeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-24 pb-12 bg-zinc-50">
      
      {/* Hero Section (Novo Estilo Profissional) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        
        {/* Badge Minimalista (Estilo "Pill") */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8 hover:border-zinc-300 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-zinc-600 tracking-wide uppercase">Live Data • BCB</span>
        </div>
        
        {/* Título Editorial (Sans + Serif) */}
        <h1 className="text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tighter mb-6 leading-[1.1]">
          Economia brasileira, <br/> 
          <span className="font-serif italic text-zinc-500 font-normal">
            descomplicada.
          </span>
        </h1>
        
        {/* Subtítulo mais sóbrio */}
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          A inteligência de dados do Banco Central em uma plataforma open-source. <br className="hidden md:block"/>
          Sem ruído, direto ao ponto.
        </p>
        
        {/* Botão High-End */}
        <button 
          onClick={() => onNavigate('dashboard')}
          className="group inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full font-medium hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 ring-1 ring-zinc-900/5"
        >
          Explorar Dashboard
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-zinc-400 group-hover:text-white" />
        </button>
      </section>

      {/* Grid Principal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          
          {/* COLUNA ESQUERDA (Card Grande) */}
          <Card className="md:col-span-2 bg-white flex flex-col justify-between overflow-hidden p-0 border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-8">
              <div className="w-12 h-12 bg-zinc-100 rounded-xl border border-zinc-200 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2 tracking-tight">Análise Profissional</h3>
              <p className="text-zinc-500 max-w-lg leading-relaxed">
                Acompanhe a evolução histórica dos indicadores macroeconômicos com precisão.
              </p>
            </div>
            
            <div className="h-80 w-full mt-4 bg-gradient-to-t from-zinc-50 to-transparent relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_DATA} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPreview" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip cursor={false} content={<></>} />
                      <Area type="monotone" dataKey="value" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#colorPreview)" />
                    </AreaChart>
                 </ResponsiveContainer>
                 <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-500 shadow-sm border border-zinc-200">
                      Preview
                    </span>
                 </div>
            </div>
          </Card>

          {/* COLUNA DIREITA */}
          <div className="flex flex-col gap-3 h-full">
            
            {/* 1. Card Educacional */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full text-left flex-1 transition-all duration-300 hover:scale-[1.01] focus:outline-none"
            >
              <Card className="h-full bg-amber-50/40 border-amber-100/50 hover:border-amber-200 hover:bg-amber-50 cursor-pointer group p-5 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-3">
                    <BookOpen className="w-6 h-6 text-amber-600/80 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Academy</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 leading-tight">
                  Impacto no seu bolso
                </h3>
                <p className="text-sm text-zinc-600 mt-2 leading-snug">
                  Entenda a correlação direta entre a Taxa Selic e a inflação oficial.
                </p>
              </Card>
            </button>

            {/* 2. Giro do Mercado (Com 3 notícias) */}
            <Card className="bg-white border-zinc-200 hover:border-zinc-300 transition-colors p-5 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Newspaper className="w-4 h-4 text-zinc-900" />
                        <h3 className="font-bold text-zinc-900 text-sm">Giro do Mercado</h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-zinc-100 px-2 py-0.5 rounded text-[10px] text-zinc-500 font-medium">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        AGORA
                    </div>
                </div>
                
                <div className="space-y-3">
                    <p className="text-xs text-zinc-800 font-medium leading-snug border-l-[3px] border-zinc-900 pl-3 py-0.5">
                      "Copom indica cautela com inflação de serviços na última ata."
                    </p>
                    <p className="text-xs text-zinc-500 leading-snug border-l-[3px] border-zinc-100 pl-3 hover:border-zinc-300 transition-colors">
                      Mercado reage com estabilidade no Dólar futuro.
                    </p>
                    <p className="text-xs text-zinc-500 leading-snug border-l-[3px] border-zinc-100 pl-3 hover:border-zinc-300 transition-colors">
                      Ibovespa fecha em alta puxada pelo setor bancário.
                    </p>
                </div>
            </Card>

            {/* 3. Card Dados Confiáveis */}
            <Card className="flex-shrink-0 bg-zinc-50 border-zinc-200 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-zinc-400" />
                <div>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Fonte Oficial</h3>
                    <p className="text-[10px] text-zinc-500">API do Banco Central (SGS)</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-zinc-100">
            <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-zinc-500" />
                <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wide">Conceitos Básicos</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-zinc-100 rounded-md text-zinc-400 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5 text-zinc-600 leading-relaxed overflow-y-auto max-h-[60vh]">
              <div>
                <strong className="text-zinc-900 block mb-1">O que é a Selic?</strong>
                <p className="text-sm">É a taxa básica de juros da economia. É o principal instrumento do Banco Central para controlar a inflação. Quando ela sobe, o crédito fica mais caro e o consumo diminui.</p>
              </div>
              <div className="h-px bg-zinc-100"></div>
              <div>
                <strong className="text-zinc-900 block mb-1">E o IPCA?</strong>
                <p className="text-sm">É o termômetro oficial da inflação no Brasil. Ele mede a variação de preços de uma cesta de produtos e serviços consumidos pelas famílias.</p>
              </div>
            </div>
            <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-100 text-right">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors shadow-sm">Entendi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}