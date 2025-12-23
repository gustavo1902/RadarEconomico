import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const { data: ipcaData, isLoading } = useQuery({
    queryKey: ['ipca'],
    queryFn: async () => {
      const res = await axios.get('/api/ipca');
      return res.data.data;
    }
  });

  const handleExplain = async () => {
    if (!ipcaData) return; // Proteção adicional
    
    const res = await axios.post('/api/explain', {
      indicator: 'IPCA',
      context: ipcaData
    });
    alert(res.data.explanation);
  };

  if (isLoading) return <div className="text-center p-10">Carregando dados econômicos...</div>;
  
  // Adicione esta verificação para garantir que os dados existem
  if (!ipcaData) return <div className="text-center p-10">Nenhum dado disponível.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Radar Econômico 📊</h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
        <h2 className="text-xl font-semibold mb-4">IPCA (Últimos 12 meses)</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ipcaData}>
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button
          onClick={handleExplain}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          ✨ Explicar Cenário com IA
        </button>
      </div>
    </div>
  );
}

export default Dashboard;