import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowUpRight, TrendingUp, Info, Zap, Clock } from 'lucide-react';

import { INDICATORS } from '../components/types'; 

export function Dashboard() {
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('ipca');
  const currentIndicator = INDICATORS.find(i => i.id === selectedIndicatorId) || INDICATORS[0];

  const { data: rawResponse, isLoading } = useQuery({
    queryKey: ['indicator', selectedIndicatorId],
    queryFn: async () => {
      const res = await axios.get(`/api/${selectedIndicatorId}`);
      return res.data.data || []; 
    },
    staleTime: 1000 * 60 * 5, 
  });

  const chartData = rawResponse?.data || [];
  const latestValue = chartData.length > 0 ? chartData[chartData.length - 1]?.valor : null;
  const lastDate = chartData.length > 0 ? chartData[chartData.length - 1]?.data : '';

  const { data: signals } = useQuery({
    queryKey: ['alpha-signals'],
    queryFn: async () => {
      const res = await axios.get('/api/signals');
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  const currentSignal = signals?.find((s: any) => s.question.toLowerCase().includes(selectedIndicatorId)) || signals?.[0];

  return (
    <div className="pt-24 pb-12 bg-zinc-50">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho com AlphaPred */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Panorama Econômico</h1>
            <div className="flex items-center gap-2 mt-2 text-zinc-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>Última atualização: {lastDate || 'Carregando...'}</span>
            </div>
          </div>

          {currentSignal && (
            <div className="bg-zinc-900 p-4 rounded-2xl text-white flex items-center gap-4 shadow-2xl border border-zinc-800">
               <div className="h-10 w-10 bg-amber-400 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-zinc-900 fill-zinc-900" />
               </div>
               <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-black">AlphaPred Intelligence</p>
                  <p className="text-sm font-bold">{currentSignal.question}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-amber-400 font-mono">
                      SIGNAL: {currentSignal.signal}
                    </span>
                    <span className="text-xs text-zinc-500">Alpha: {(currentSignal.alpha * 100).toFixed(2)}%</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Grid de Indicadores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {INDICATORS.map((indicator) => (
              <button
                key={indicator.id}
                onClick={() => setSelectedIndicatorId(indicator.id)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  selectedIndicatorId === indicator.id
                    ? 'bg-white border-zinc-900 shadow-xl scale-[1.02]'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg ${selectedIndicatorId === indicator.id ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  {selectedIndicatorId === indicator.id && <ArrowUpRight className="w-4 h-4 text-zinc-900" />}
                </div>
                <h3 className="font-bold text-zinc-900">{indicator.name}</h3>
                <p className="text-xs text-zinc-400 mt-1">{indicator.unit}</p>
              </button>
            ))}
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8">
            <div className="mb-10">
                <h2 className="text-6xl font-black text-zinc-900 tracking-tighter">
                    {latestValue ? latestValue.toFixed(2) : '0.00'}
                    <span className="text-2xl text-zinc-300 font-light ml-2">{currentIndicator.unit}</span>
                </h2>
                <p className="text-zinc-400 text-sm mt-2">{currentIndicator.description}</p>
            </div>

            <div className="h-[350px] w-full">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center bg-zinc-50 rounded-2xl animate-pulse text-zinc-400 italic">
                        Sincronizando com Banco Central...
                    </div>
                ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="data" hide />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181b', borderRadius: '12px', border: 'none', color: '#fff' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="valor" 
                              stroke={currentIndicator.color} 
                              strokeWidth={4} 
                              dot={false} 
                              animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                        <Info className="mb-2 w-8 h-8 opacity-20" />
                        <p>Nenhum dado encontrado para {currentIndicator.name}.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}