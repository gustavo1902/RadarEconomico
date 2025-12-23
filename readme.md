# Radar Econômico

O **Radar Econômico** é uma plataforma web de inteligência de dados desenvolvida para democratizar o acesso e a compreensão de indicadores macroeconômicos brasileiros. O sistema coleta dados oficiais em tempo real, processa séries históricas e as apresenta através de visualizações interativas e contextos educacionais.

## Visão Geral

Este projeto foi construído para resolver a fragmentação e complexidade dos dados financeiros públicos. Utilizando uma arquitetura moderna e escalável, a aplicação consome dados diretamente do Banco Central do Brasil (BCB), garantindo a integridade das informações sem depender de intermediários pagos.

## Stack Tecnológica

O projeto utiliza uma stack moderna focada em performance, tipagem estática e manutenibilidade.

### Frontend
* **React 18:** Biblioteca para construção da interface.
* **TypeScript:** Superset JavaScript para tipagem estática e segurança de código.
* **Vite:** Build tool de nova geração para desenvolvimento rápido.
* **Tailwind CSS:** Framework de utilitários para estilização responsiva. 
* **Recharts:** Biblioteca de composição de gráficos baseada em componentes React. 
* **TanStack Query:** Gerenciamento de estado assíncrono e cache de dados. 
* **Lucide React:** Biblioteca de ícones leve e consistente. 

### Backend & Infraestrutura
* **Node.js:** Ambiente de execução para funções serverless. 
* **Vercel:** Plataforma de hospedagem e CI/CD.
* **Axios:** Cliente HTTP para requisições externas.

### Fonte de Dados
* **API SGS (Sistema Gerenciador de Séries Temporais):** Integração direta com o Banco Central do Brasil.

## Arquitetura do Projeto

A aplicação segue uma estrutura modular, separando responsabilidades de interface, lógica de negócios e definições de tipos.

```text
src/
├── components/         # Componentes reutilizáveis de UI e Layout
│   ├── Layout/         # Header, Footer e estruturas de página
│   └── ui/             # Componentes base (Cards, Botões)
├── pages/              # Páginas da aplicação (Home, Dashboard)
├── types/              # Definições de tipos TypeScript globais e interfaces
├── App.tsx             # Componente raiz e roteamento
└── main.tsx            # Ponto de entrada da aplicação
```

Instalação e Execução
Pré-requisitos: Node.js (versão 18 ou superior).

### Clone o repositório

Bash
```
git clone [https://github.com/gustavo1902/RadarEconomico.git](https://github.com/gustavo1902/RadarEconomico.git)

cd RadarEconomico
```
### Instale as dependências


```
npm install
```

### Execute o servidor de desenvolvimento


```
npm run dev
```
A aplicação estará disponível em http://localhost:5173.

## Funcionalidades Principais
Dashboard Interativo: Visualização gráfica de séries históricas (IPCA, Selic, PIB, Câmbio).

Live Data Preview: Gráficos de área na página inicial para visualização rápida de tendências.

Módulo Educacional: Explicações contextuais sobre o impacto dos indicadores na economia real.

Feed de Mercado: Seção dedicada a atualizações e destaques do cenário econômico.
 
## Disclaimer
Este projeto possui fins estritamente educacionais e analíticos. As informações apresentadas não constituem recomendação de investimento ou aconselhamento financeiro. Todos os dados são obtidos de fontes públicas oficiais. 