import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { context, indicator } = req.body;

    if (!context || !indicator) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Atue como um analista econômico.
      Com base nos dados históricos abaixo, explique em até 3 frases curtas
      o cenário recente do indicador ${indicator}.
      
      Dados:
      ${JSON.stringify(context)}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ explanation: text });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao gerar explicação' });
  }
}
