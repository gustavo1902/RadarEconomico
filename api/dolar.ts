import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/15?formato=json';
    const response = await axios.get(url);

    const formatted = response.data.map((item: any) => ({
      data: item.data,
      valor: Number(item.valor)
    }));

    return res.status(200).json({ data: formatted });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar Dólar' });
  }
}