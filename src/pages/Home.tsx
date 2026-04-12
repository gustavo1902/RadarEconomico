import { ArrowUpRight, ShieldCheck, Newspaper, TrendingUp } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'dashboard' | 'alpha-intelligence' | 'academy') => void;
}

export function Home({ onNavigate }: HomeProps) {
  
  const handleNavigate = (page: 'dashboard' | 'alpha-intelligence' | 'academy') => {
    window.scrollTo(0, 0);
    onNavigate(page);
  };

  return (
    <div className="bg-white font-sans">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between pt-24 overflow-hidden">
        
        {/* Background Video*/}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/data.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Escuro para contraste */}
        <div className="absolute inset-0 bg-zinc-950/70 z-0"></div>

        {/* Texto Central */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-tight max-w-4xl">
            Seu hub para econômia.
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Integramos o rigor dos dados oficiais do Banco Central à agilidade dos modelos preditivos modernos. 
            Decisões baseadas em fatos.
          </p>
        </div>

        {/* Cards de Navegação Inferiores */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-8 md:pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            {/* Card 1: Dashboard */}
            <div 
              onClick={() => handleNavigate('dashboard')}
              className="relative h-48 md:h-64 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800&grayscale" 
                alt="Dashboard"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-1 block">Dados Oficiais</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Dashboard Histórico</h3>
                </div>
                <ArrowUpRight className="w-6 h-6 text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Card 2: Alpha Intelligence */}
            <div 
              onClick={() => handleNavigate('alpha-intelligence')}
              className="relative h-48 md:h-64 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&grayscale" 
                alt="Alpha Intelligence"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-1 block">Modelo Quantitativo</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Inteligência Alpha</h3>
                </div>
                <ArrowUpRight className="w-6 h-6 text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Card 3: Academy */}
            <div 
              onClick={() => handleNavigate('academy')}
              className="relative h-48 md:h-64 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800&grayscale" 
                alt="Academy"
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-1 block">Aprenda</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Academy</h3>
                </div>
                <ArrowUpRight className="w-6 h-6 text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO GIRO DO MERCADO */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-12 border-b border-zinc-200 pb-6">
              <div className="flex items-center gap-4">
                  <div className="bg-zinc-900 p-2 rounded-md">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Giro do Mercado</h2>
              </div>
              
              {/* Badge LIVE Monocromático */}
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200">
                  <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
                  </span>
                  LIVE
              </div>
          </div>

          <div className="space-y-6">
            <NewsCard 
              category="POLÍTICA MONETÁRIA" 
              title="Copom indica cautela com inflação de serviços na última ata oficial divulgada ao mercado." 
              time="HÁ 15 MINUTOS"
              icon={<ShieldCheck className="w-5 h-5 text-zinc-900" />}
            />
            <NewsCard 
              category="BOLSA" 
              title="Ibovespa fecha em alta puxada pelo setor bancário após série de resultados trimestrais positivos." 
              time="HÁ 1 HORA"
              icon={<TrendingUp className="w-5 h-5 text-zinc-900" />}
            />
            <NewsCard 
              category="CÂMBIO" 
              title="Mercado reage com estabilidade no Dólar futuro aguardando novos dados de emprego dos EUA (Payroll)." 
              time="HÁ 2 HORAS"
              icon={<TrendingUp className="w-5 h-5 text-zinc-900" />}
            />
          </div>
          
        </div>
      </section>
    </div>
  );
}

function NewsCard({ category, title, time, icon }: { category: string, title: string, time: string, icon: any }) {
    return (
        <div className="group bg-zinc-50 border border-zinc-200 p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-900 hover:border-zinc-900 transition-all duration-500">
            <div className="flex items-start gap-6">
                <div className="mt-1 bg-white p-3 rounded-xl border border-zinc-200 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <div>
                    <span className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase group-hover:text-zinc-400 transition-colors">
                      {category}
                    </span>
                    <h4 className="text-lg font-semibold text-zinc-900 mt-2 leading-relaxed group-hover:text-white transition-colors duration-500">
                      {title}
                    </h4>
                </div>
            </div>
            <div className="text-right flex-shrink-0 md:pl-6 border-t md:border-t-0 md:border-l border-zinc-200 group-hover:border-zinc-700 pt-4 md:pt-0 mt-2 md:mt-0 transition-colors">
                <span className="text-[10px] font-bold text-zinc-400 tracking-[0.1em]">{time}</span>
            </div>
        </div>
    );
}