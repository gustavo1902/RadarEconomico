import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Zap } from 'lucide-react';

export function AlphaIntelligence() {
  const { data: signals, isLoading } = useQuery({
    queryKey: ['alpha-signals'],
    queryFn: async () => {
      const res = await axios.get('/api/signals');
      return Array.isArray(res.data) ? res.data : [];
    },
    refetchInterval: 1000 * 60 * 5
  });

  return (
    <div className="pt-24 pb-12 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-zinc-900 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">AlphaPred Intelligence</h1>
          </div>
          <p className="text-zinc-500 max-w-2xl">
            Nosso modelo proprietário identifica ineficiências em mercados de previsão, 
            comparando probabilidades implícitas de mercado com estimativas estatísticas.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-zinc-200 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {signals?.map((signal: any, idx: number) => (
              <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-zinc-900">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-zinc-100 text-zinc-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {signal.source}
                  </span>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    signal.signal.includes('BUY') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {signal.signal}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mb-4 leading-tight">
                  {signal.question}
                </h3>

                <div className="space-y-3 pt-4 border-t border-zinc-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Prob. Mercado</span>
                    <span className="font-bold">{(signal.prob_market * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Prob. Modelo</span>
                    <span className="font-bold">{(signal.prob_model * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Edge (Alpha)</span>
                    <span className={`text-lg font-black ${(signal.alpha > 0) ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {(signal.alpha * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}