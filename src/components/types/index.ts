export interface EconomicData {
  data: string;
  valor: number;
}

export interface IndicatorConfig {
  id: string;
  name: string;
  series: number;
  color: string;
  description: string;
  unit: string;
}

export const INDICATORS: IndicatorConfig[] = [
  { id: 'ipca', name: 'IPCA', series: 433, color: '#18181b', description: 'Inflação oficial (IBGE)', unit: '%' },
  { id: 'selic', name: 'Taxa Selic', series: 432, color: '#2563eb', description: 'Taxa básica de juros', unit: '% a.a.' },
  { id: 'pib', name: 'PIB', series: 4385, color: '#059669', description: 'Atividade econômica', unit: 'Var. %' },
  { id: 'cambio', name: 'Dólar (USD)', series: 1, color: '#dc2626', description: 'Taxa de câmbio', unit: 'R$' }
];