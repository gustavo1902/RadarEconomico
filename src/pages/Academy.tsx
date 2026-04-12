import { useState } from 'react';
import { GraduationCap, BookOpen, ArrowUpRight } from 'lucide-react';
import { ModalReading } from '../components/Layout/Modal/ModalReading';

const CONCEPTS = [
  {
    title: "Taxa Selic",
    subtitle: "O custo do dinheiro",
    tag: "Política Monetária",
    description: "A taxa básica que dita o ritmo dos juros no Brasil.",
    content: [
      "A Selic é a taxa básica de juros da economia, o principal instrumento do Banco Central para controlar a inflação. Quando a Selic sobe, o objetivo é desestimular o consumo, tornando o crédito mais caro, o que ajuda a baixar os preços.",
      "Para o investidor, uma Selic alta significa que a Renda Fixa (como o Tesouro Direto) se torna extremamente atraente, muitas vezes rendendo acima de 1% ao mês com baixo risco.",
      "Já quando a Selic cai, o Banco Central quer estimular a economia. O crédito fica mais barato para empresas e consumidores, mas a rentabilidade das aplicações conservadoras diminui, forçando o investidor a buscar mais risco na Bolsa de Valores."
    ]
  },
  {
    title: "IPCA",
    subtitle: "Índice de Preços",
    tag: "Inflação",
    description: "O termômetro oficial do poder de compra brasileiro.",
    content: [
      "O IPCA (Índice Nacional de Preços ao Consumidor Amplo) mede a variação de preços de uma cesta de produtos e serviços consumidos pelas famílias brasileiras. É o dado que diz se o seu dinheiro está 'valendo menos'.",
      "O Banco Central persegue uma meta de inflação. Se o IPCA sobe além do esperado, o Copom geralmente eleva a Selic para tentar frear essa alta.",
      "Para quem investe, é vital buscar rentabilidades que superem o IPCA (Ganho Real). Se seu investimento rende 10% e a inflação é 6%, seu ganho real foi de apenas 4%."
    ]
  },
  {
    title: "PIB",
    subtitle: "Produto Interno Bruto",
    tag: "Atividade",
    description: "A soma de todas as riquezas produzidas no país.",
    content: [
      "O PIB representa a soma de todos os bens e serviços finais produzidos no país. Ele indica se a economia está crescendo ou entrando em recessão.",
      "Um PIB forte geralmente reflete empresas lucrando mais, maior taxa de emprego e um mercado de capitais mais otimista. É o indicador máximo da 'saúde' do país.",
      "Para o cidadão comum, o crescimento do PIB traduz-se em melhores oportunidades de carreira e maior estabilidade econômica a longo prazo."
    ]
  },
  {
    title: "Câmbio",
    subtitle: "Real vs Dólar",
    tag: "Câmbio",
    description: "O valor da nossa moeda no cenário global.",
    content: [
      "A taxa de câmbio é o preço de uma moeda estrangeira medido em unidades da moeda nacional. No Brasil, o foco é quase sempre o par USD/BRL.",
      "Um dólar alto pressiona a inflação, pois muitos insumos industriais e combustíveis são cotados na moeda americana. Por outro lado, favorece exportadores brasileiros.",
      "Investir em ativos dolarizados é uma estratégia comum de defesa de portfólio contra as incertezas políticas e econômicas locais do Brasil."
    ]
  },
  {
    title: "Copom",
    subtitle: "Decisões de Juros",
    tag: "Institucional",
    description: "O comitê que define o futuro da sua rentabilidade.",
    content: [
      "O Comitê de Política Monetária (Copom) se reúne a cada 45 dias para definir a meta da Taxa Selic. É um dos eventos mais aguardados do mercado financeiro.",
      "As decisões são baseadas em relatórios minuciosos sobre inflação, atividade econômica e o cenário internacional.",
      "A comunicação do Copom através das 'Atas' dá pistas valiosas se os juros vão continuar subindo, se estabilizar ou começar a cair nas próximas reuniões."
    ]
  },
  {
    title: "IGP-M",
    subtitle: "Inflação do Aluguel",
    tag: "Inflação",
    description: "O índice que afeta diretamente os contratos imobiliários.",
    content: [
      "O IGP-M é muito influenciado pelos preços no atacado e pelo valor das commodities e do dólar. Ele costuma ser mais volátil que o IPCA.",
      "É historicamente conhecido como a 'inflação do aluguel', pois a maioria dos contratos de locação utiliza esse índice para o reajuste anual.",
      "Para o investidor imobiliário ou de fundos (FIIs), monitorar o IGP-M é essencial para prever o fluxo de dividendos e reajustes de contratos."
    ]
  }
];

export function Academy() {
  const [selectedArticle, setSelectedArticle] = useState<typeof CONCEPTS[0] | null>(null);

  return (
    <div className="pt-32 pb-20 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header da Página */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-200 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-2.5 rounded-xl border border-amber-200 shadow-sm">
                <GraduationCap className="w-5 h-5 text-amber-700" />
              </div>
              <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Academy Terminal</h1>
            </div>
            <p className="text-zinc-500 text-lg">
              Domine os pilares da macroeconomia com guias técnicos simplificados. Entenda o impacto dos dados no seu patrimônio.
            </p>
          </div>
          <div className="bg-white border border-zinc-200 px-4 py-2 rounded-full shadow-sm text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Módulo Educativo v1.0
          </div>
        </div>

        {/* Grid de Conceitos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONCEPTS.map((concept, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedArticle(concept)}
              className="bg-white border border-zinc-200 rounded-[2rem] p-8 hover:shadow-xl hover:border-zinc-400 transition-all duration-500 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    {concept.tag}
                  </span>
                  <div className="bg-zinc-50 p-2 rounded-lg group-hover:bg-zinc-900 transition-colors duration-500">
                    <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors">{concept.title}</h3>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">{concept.subtitle}</p>
                
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                  {concept.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-900">
                <span>Ler Artigo</span>
                <div className="p-2 rounded-full bg-zinc-100 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Leitura */}
        <ModalReading 
          isOpen={!!selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
          article={selectedArticle}
        />

      </div>
    </div>
  );
}