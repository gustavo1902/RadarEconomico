import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const ALPHAPRED_URL = 'https://alphapred-y1md.onrender.com/signals';
    
    const response = await axios.get(ALPHAPRED_URL);
    
    // Retorna os sinais para o seu frontend React
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar sinais do AlphaPred:', error);
    return res.status(500).json({ error: 'Erro ao conectar com AlphaPred' });
  }
}