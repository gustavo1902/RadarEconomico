import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Clock, Database, TrendingUp, TrendingDown, Activity } from 'lucide-react';

import { INDICATORS } from '../components/types'; 

export function Dashboard() {
  const [selectedIndicatorId, setSelectedIndicatorId] = useState('ipca');
  const currentIndicator = INDICATORS.find(i => i.id === selectedIndicatorId) || INDICATORS[0];

  const { data: rawResponse, isLoading } = useQuery({
    queryKey: ['indicator', selectedIndicatorId],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/${selectedIndicatorId}`);
        localStorage.setItem(`cache_${selectedIndicatorId}`, JSON.stringify(res.data));
        return res.data;
      } catch (err) {
        const cached = localStorage.getItem(`cache_${selectedIndicatorId}`);
        if (cached) return JSON.parse(cached);
        throw err;
      }
    },
    staleTime: 1000 * 60 * 60, 
  });

  const chartData = rawResponse?.data || [];
  
  // Lógica de valores e tendências
  const latestValue = chartData.length > 0 ? chartData[chartData.length - 1]?.valor : null;
  const previousValue = chartData.length > 1 ? chartData[chartData.length - 2]?.valor : null;
  const lastDate = chartData.length > 0 ? chartData[chartData.length - 1]?.data : '';
  
  const delta = (latestValue !== null && previousValue !== null) ? (latestValue - previousValue) : 0;
  const isUp = delta > 0;
  const isNeutral = delta === 0;

  return (
    <div className="pt-32 pb-20 bg-zinc-50 min-h-screen">  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho do Dashboard */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-200 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-zinc-900 p-2.5 rounded-xl shadow-md border border-zinc-700">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-4xl font-black text-zinc-900 tracking-tight">SGS Data Terminal</h1>
            </div>
            <p className="text-zinc-500 text-lg max-w-2xl">
              Acesso em tempo real à base de dados do Sistema Gerenciador de Séries Temporais do Banco Central.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-zinc-500 bg-white border border-zinc-200 px-4 py-2 rounded-lg shadow-sm">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Última Sincronização: {lastDate || (isLoading ? 'Buscando...' : 'Sem dados')}
            </span>
          </div>
        </div>

        {/* Grid de Seletores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {INDICATORS.map((indicator) => {
              const isSelected = selectedIndicatorId === indicator.id;
              
              return (
                <button
                  key={indicator.id}
                  onClick={() => setSelectedIndicatorId(indicator.id)}
                  className={`relative p-6 border text-left transition-all duration-300 overflow-hidden group ${
                    isSelected
                      ? 'bg-zinc-950 border-zinc-950 text-white shadow-xl rounded-2xl scale-[1.02]'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 rounded-2xl'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-zinc-400' : 'text-zinc-400'}`}>
                      {indicator.unit}
                    </span>
                    {isSelected && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                    {indicator.name}
                  </h3>
                  <p className={`text-xs ${isSelected ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {indicator.description}
                  </p>
                </button>
              )
            })}
        </div>

        {/* Área Principal do Gráfico */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 md:p-10 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                    <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      {currentIndicator.name} Atual
                    </h2>
                    <div className="flex items-baseline gap-3">
                      <span className="text-7xl font-black text-zinc-900 tracking-tighter">
                          {latestValue ? latestValue.toFixed(2) : '0.00'}
                      </span>
                      <span className="text-2xl text-zinc-400 font-medium">
                        {currentIndicator.unit}
                      </span>
                    </div>
                </div>

                {/* Bloco de Tendência Delta */}
                {latestValue !== null && previousValue !== null && (
                  <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isUp ? 'bg-rose-100 text-rose-600' : isNeutral ? 'bg-zinc-200 text-zinc-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {isUp ? <TrendingUp className="w-5 h-5" /> : isNeutral ? <Activity className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Movimento (Últ. Período)</p>
                      <p className={`text-lg font-bold font-mono ${isUp ? 'text-rose-600' : isNeutral ? 'text-zinc-600' : 'text-emerald-600'}`}>
                        {delta > 0 ? '+' : ''}{delta.toFixed(2)} bps
                      </p>
                    </div>
                  </div>
                )}
            </div>

            {/* Container Recharts */}
            <div className="h-[400px] w-full relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50/50 backdrop-blur-sm rounded-2xl border border-zinc-100 z-10">
                        <Activity className="w-8 h-8 text-zinc-400 animate-pulse mb-3" />
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest animate-pulse">Sincronizando SGS...</span>
                    </div>
                ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                            <XAxis 
                              dataKey="data" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }} 
                              dy={15} 
                              minTickGap={30}
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#a1a1aa', fontSize: 10, fontWeight: 600 }} 
                              dx={-10}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#09090b', 
                                  borderRadius: '12px', 
                                  border: '1px solid #27272a', 
                                  color: '#fff',
                                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                labelStyle={{ color: '#a1a1aa', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}
                                cursor={{ stroke: '#e4e4e7', strokeWidth: 2, strokeDasharray: '4 4' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="valor" 
                              stroke="#09090b" 
                              strokeWidth={3} 
                              dot={{ r: 4, fill: '#fff', stroke: '#09090b', strokeWidth: 2 }} 
                              activeDot={{ r: 6, fill: '#09090b', stroke: '#fff', strokeWidth: 2 }}
                              animationDuration={1500}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                        <Database className="mb-3 w-8 h-8 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">Nenhum dado encontrado.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}