export default async function handler(req: any, res: any) {
  try {
    const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/12?formato=json');
    
    if (!response.ok) {
      throw new Error(`Erro na API do BCB: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar dados de câmbio do BCB' });
  }
}