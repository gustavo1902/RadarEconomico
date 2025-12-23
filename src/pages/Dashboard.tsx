import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowUpRight, TrendingUp, Info } from 'lucide-react';

// Importando do local correto que criamos
import { INDICATORS, EconomicData } from '../components/types'; 

export function Dashboard() {
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('ipca');
  
  // Encontra o indicador ou usa o primeiro como fallback seguro
  const currentIndicator = INDICATORS.find(i => i.id === selectedIndicatorId) || INDICATORS[0];

  const { data, isLoading } = useQuery<EconomicData[]>({
    queryKey: ['indicator', selectedIndicatorId],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${currentIndicator.series}/dados?formato=json`
      );
      // Tipagem explícita no map para evitar erro de "any"
      return res.data.slice(-12).map((item: { data: string; valor: string }) => ({
        data: item.data,
        valor: parseFloat(item.valor)
      }));
    },
    staleTime: 1000 * 60 * 60, 
  });

  const latestValue = data?.[data.length - 1]?.valor;

  return (
    <div className="pt-24 pb-12 bg-zinc-50">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Panorama Econômico</h1>
          <p className="text-zinc-500 mt-2">Acompanhe métricas vitais em tempo real.</p>
        </div>

        {/* Grid de Seleção */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {INDICATORS.map((indicator) => (
              <button
                key={indicator.id}
                onClick={() => setSelectedIndicatorId(indicator.id)}
                className={`group p-4 rounded-xl border text-left transition-all duration-300 ${
                  selectedIndicatorId === indicator.id
                    ? 'bg-white border-zinc-900 shadow-lg ring-1 ring-zinc-900/5'
                    : 'bg-white border-zinc-200 hover:border-zinc-400 hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                     selectedIndicatorId === indicator.id ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {indicator.unit}
                  </span>
                  {selectedIndicatorId === indicator.id && <ArrowUpRight className="w-4 h-4 text-zinc-900" />}
                </div>
                <h3 className="font-bold text-zinc-900">{indicator.name}</h3>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{indicator.description}</p>
              </button>
            ))}
        </div>

        {/* Área do Gráfico */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-5 h-5 text-zinc-400" />
                        <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Tendência Atual</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-5xl font-bold text-zinc-900 tracking-tighter">
                            {isLoading ? '...' : latestValue?.toFixed(2)}
                            <span className="text-2xl text-zinc-400 font-normal ml-1">{currentIndicator.unit}</span>
                        </h2>
                    </div>
                </div>
                
                <div className="hidden md:flex items-center gap-2 text-sm text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                    <Info className="w-4 h-4" />
                    Fonte: Banco Central do Brasil (SGS)
                </div>
            </div>

            <div className="h-[400px] w-full">
                {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center bg-zinc-50 rounded-xl animate-pulse">
                        <span className="text-zinc-400 font-medium">Carregando dados...</span>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                            <XAxis 
                                dataKey="data" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#71717a', fontSize: 12 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#71717a', fontSize: 12 }} 
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#18181b', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    color: '#fff',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: '#e4e4e7', strokeWidth: 2 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="valor" 
                                stroke={currentIndicator.color} 
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                                animationDuration={1000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}