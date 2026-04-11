import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Zap, Activity, Crosshair } from 'lucide-react';

export function AlphaIntelligence() {
  const { data: signals, isLoading } = useQuery({
    queryKey: ['alpha-signals'],
    queryFn: async () => {
      const res = await axios.get('/api/signals');
      return Array.isArray(res.data) ? res.data : [];
    },
    refetchInterval: 1000 * 60 * 5
  });

  const totalOpps = signals?.length || 0;
  const avgAlpha = signals && signals.length > 0 
    ? (signals.reduce((acc: number, curr: any) => acc + Math.abs(curr.alpha), 0) / totalOpps) * 100 
    : 0;

  return (
    <div className="pt-24 pb-12 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho Institucional */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-zinc-200 pb-8">
            <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-zinc-900 p-2.5 rounded-xl shadow-lg border border-zinc-700">
                    <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
                    </div>
                    <h1 className="text-4xl font-black text-zinc-900 tracking-tight">AlphaPred Engine</h1>
                </div>
                <p className="text-zinc-500 text-lg">
                    Monitoramento quantitativo de mercados preditivos. Identificamos assimetrias de probabilidade entre consensos de mercado e modelos algorítmicos.
                </p>
            </div>
            
            <div className="flex gap-6 mt-6 md:mt-0">
                <div className="text-right">
                    <p className="text-xs uppercase font-bold text-zinc-400 tracking-widest mb-1">Média de Edge</p>
                    <p className="text-3xl font-mono font-bold text-zinc-900">{avgAlpha.toFixed(2)}%</p>
                </div>
                <div className="w-px h-12 bg-zinc-200"></div>
                <div className="text-right">
                    <p className="text-xs uppercase font-bold text-zinc-400 tracking-widest mb-1">Sinais Ativos</p>
                    <p className="text-3xl font-mono font-bold text-zinc-900">{totalOpps}</p>
                </div>
            </div>
        </div>

        {/* Grid de Cards de Arbitragem */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-64 bg-zinc-200 rounded-3xl" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {signals?.map((signal: any, idx: number) => {
              const mktProb = signal.prob_market * 100;
              const mdlProb = signal.prob_model * 100;
              const isBuy = signal.signal.includes('BUY');
              
              return (
                <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                  
                  {/* Fundo decorativo */}
                  <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-[0.03] pointer-events-none ${isBuy ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                        <span className="bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
                            {signal.source || 'POLYGON'}
                        </span>
                        <span className="bg-zinc-100 border border-zinc-200 text-zinc-600 text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
                            {signal.category || 'MACRO'}
                        </span>
                    </div>
                    
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black tracking-widest uppercase border ${
                      isBuy ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}>
                      <Activity className="w-3.5 h-3.5" />
                      {signal.signal}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 mb-8 leading-tight pr-8">
                    {signal.question}
                  </h3>

                  <div className="space-y-6">
                    
                    {/* Barras de Spread Visuais */}
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wide">
                            <span className="text-zinc-400">Consenso Mercado</span>
                            <span className="text-zinc-900 font-mono">{mktProb.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-zinc-300 h-2.5 rounded-full" style={{ width: `${mktProb}%` }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wide">
                            <span className="flex items-center gap-1 text-amber-600">
                                <Crosshair className="w-3.5 h-3.5" /> Modelo AlphaPred
                            </span>
                            <span className="text-amber-600 font-mono">{mdlProb.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden relative">
                            <div className="bg-amber-400 h-2.5 rounded-full absolute top-0 left-0" style={{ width: `${mdlProb}%` }}></div>
                        </div>
                    </div>

                  </div>

                  {/* Rodapé do Card */}
                  <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-between items-center">
                      <div>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Desvio Calculado (Alpha)</p>
                          <p className={`text-xl font-black font-mono ${(signal.alpha > 0) ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {(signal.alpha > 0 ? '+' : '')}{(signal.alpha * 100).toFixed(2)}%
                          </p>
                      </div>
                      {signal.volume && (
                          <div className="text-right">
                              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Volume (24h)</p>
                              <p className="text-sm font-bold text-zinc-700">${signal.volume.toLocaleString()}</p>
                          </div>
                      )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}