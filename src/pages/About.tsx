import { Card } from '../components/ui/Card';
import { Code2, Database, LayoutTemplate, Server } from 'lucide-react';

export function About() {
  return (
    <div className="bg-zinc-50 pt-20 pb-12">  {/* REMOVIDO min-h-screen */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho mais compacto */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Sobre o Projeto</h1>
          <p className="text-zinc-500 mt-2 max-w-2xl mx-auto">
            Uma iniciativa open-source para democratizar dados financeiros.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Coluna Principal (2/3 da tela) - A Missão */}
          <div className="md:col-span-2 space-y-6">
            <Card className="h-full">
              <h2 className="text-lg font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                Propósito
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                O Radar Econômico nasceu da necessidade de simplificar a visualização de dados macroeconômicos brasileiros. 
                Enquanto a maioria das plataformas foca em traders e investidores profissionais com interfaces complexas, 
                nosso objetivo é trazer clareza e contexto.
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Utilizamos dados públicos e tecnologia moderna para transformar planilhas do Banco Central em 
                dashboards intuitivos para estudantes, desenvolvedores e cidadãos comuns.
              </p>
            </Card>
          </div>

          {/* Coluna Lateral - Informações Rápidas */}
          <div className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-900 text-white">
              <h3 className="font-semibold mb-1">Status</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-zinc-300">Online & Atualizado</span>
              </div>
            </Card>
            
            <Card>
              <h3 className="font-semibold text-zinc-900 mb-2 text-sm">Links</h3>
              <a href="https://github.com/gustavo1902/RadarEconomico" target='_blank' rel="noreferrer" className="block text-sm text-blue-600 hover:underline mb-1">Repositório GitHub ↗</a>
              <a href="https://dadosabertos.bcb.gov.br/" target="_blank" rel="noreferrer" className="block text-sm text-blue-600 hover:underline">Fonte de Dados (BCB) ↗</a>
            </Card>
          </div>
        </div>

        {/* Stack Tecnológica - Agora em linha horizontal*/}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4 ml-1">Stack Tecnológica</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TechItem 
              icon={<LayoutTemplate className="w-5 h-5 text-blue-600" />}
              title="Frontend"
              desc="React + Vite"
            />
            <TechItem 
              icon={<Code2 className="w-5 h-5 text-purple-600" />}
              title="Estilização"
              desc="Tailwind CSS"
            />
            <TechItem 
              icon={<Server className="w-5 h-5 text-green-600" />}
              title="Backend"
              desc="Node Serverless"
            />
            <TechItem 
              icon={<Database className="w-5 h-5 text-amber-600" />}
              title="Dados"
              desc="API BCB / SGS"
            />
          </div>
        </div>

        
      </div>
    </div>
  );
}

// Pequeno componente auxiliar para limpar o código principal
function TechItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 flex items-center gap-3 shadow-sm hover:border-zinc-300 transition-colors">
      <div className="bg-zinc-50 p-2 rounded-md border border-zinc-100">
        {icon}
      </div>
      <div>
        <span className="block text-xs font-bold text-zinc-900">{title}</span>
        <span className="text-xs text-zinc-500">{desc}</span>
      </div>
    </div>
  );
}