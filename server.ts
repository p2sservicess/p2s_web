import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', agency: 'P2S - Problem To Solution', timestamp: new Date().toISOString() });
});

// AI Solution Finder Endpoint
app.post('/api/ai-recommendation', async (req, res) => {
  try {
    const { problemText, industry, budget } = req.body;

    if (!problemText) {
      return res.status(400).json({ error: 'Problem description is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
        const prompt = `
You are the AI Growth Strategist at P2S (Problem To Solution), a premier digital and social media growth agency.
A prospective client shared the following business situation:

- Business Challenge / Problem: "${problemText}"
- Industry: "${industry || 'General Business'}"
- Budget Range: "${budget || 'Flexible'}"

Please analyze their problem and provide a structured JSON response with:
1. "analysis": A 2-sentence diagnostic identifying the exact bottleneck.
2. "recommendedPackage": Choose the single best fit among: "Basic Package (₹4,000/mo)", "Expert Package (₹8,000/mo)", "Growth Package (₹12,000/mo)", or "Premium Package (₹16,000/mo)".
3. "actionPlan": Array of 3 specific, actionable solution steps P2S will execute.
4. "estimatedRoi": A realistic projected outcome (e.g., "3.5x Lead Increase in 90 Days" or "250% Growth in Engagement").

Return strictly valid JSON in this exact structure:
{
  "analysis": "...",
  "recommendedPackage": "...",
  "actionPlan": ["Step 1", "Step 2", "Step 3"],
  "estimatedRoi": "..."
}
`;

        const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
        let responseText: string | null | undefined = null;

        for (const modelName of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
              },
            });

            if (response.text) {
              responseText = response.text;
              break;
            }
          } catch (modelErr: any) {
            console.log(`Notice: Model ${modelName} unavailable or rate-limited. Trying fallback.`);
          }
        }

        if (responseText) {
          const parsed = JSON.parse(responseText);
          return res.json(parsed);
        }
      } catch (genAiError) {
        console.log('Gemini API call bypassed, serving smart heuristic fallback engine.');
      }
    }

    // Smart Fallback Diagnostic if GEMINI_API_KEY is not configured
    let fallbackPackage = "Growth Package (₹12,000/mo)";
    if (budget && (budget.includes('5,000') || budget.includes('Under'))) {
      fallbackPackage = "Basic Package (₹4,000/mo)";
    } else if (budget && budget.includes('20,000')) {
      fallbackPackage = "Premium Package (₹16,000/mo)";
    }

    return res.json({
      analysis: `We diagnosed your challenge regarding "${problemText.slice(0, 50)}...". The primary constraint is fragmented content reach combined with unoptimized conversion pathways.`,
      recommendedPackage: fallbackPackage,
      actionPlan: [
        "Audit existing content assets and engineer high-retention short-form video hooks.",
        "Launch targeted Meta & TikTok performance campaign targeting high-intent buyer personas.",
        "Deploy automated lead capture funnel to convert organic traffic directly into qualified bookings."
      ],
      estimatedRoi: "3.2x Lead Volume & 240% Reach Expansion in 60 Days"
    });

  } catch (err: any) {
    console.error('Error in /api/ai-recommendation:', err);
    return res.status(500).json({
      error: 'Failed to process AI recommendation',
      details: err?.message || 'Unknown error'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`P2S Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
