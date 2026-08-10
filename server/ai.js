import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

export const suggestSummaryHandler = async (req: Request, res: Response) => {
  const { jobTitle, skills, experienceYears } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Fallback template suggestion if API key is not configured
    const title = jobTitle || 'Professional';
    const fallbackText = `Results-oriented ${title} with proven expertise in ${skills || 'software development, team collaboration, and project execution'}. Recognized for delivering scalable solutions, driving efficiency, and maintaining high standards of quality across all deliverables. Strong analytical problem-solver adept at turning complex requirements into streamlined outcomes.`;
    return res.json({
      success: true,
      data: { summary: fallbackText }
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `Write a compelling 3-4 sentence professional summary for a resume with the following details:
Job Title: ${jobTitle || 'Professional'}
Key Skills: ${skills || 'Technical skills, problem solving, teamwork'}
Experience Level: ${experienceYears || '3+ years'}

Make it punchy, impactful, and written in active voice. Do not include markdown formatting or quotes around the output.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const summaryText = response.text?.trim() || '';
    return res.json({
      success: true,
      data: { summary: summaryText }
    });
  } catch (err: any) {
    console.error('Gemini summary generation error:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to generate summary using AI'
    });
  }
};

export const enhanceBulletsHandler = async (req: Request, res: Response) => {
  const { text, jobTitle } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: 'Text is required for bullet point enhancement' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Basic polish fallback
    const enhanced = text.split('\n').map(line => {
      const trimmed = line.replace(/^[•\-\*\s]+/, '').trim();
      if (!trimmed) return '';
      return `• Spearheaded ${trimmed} resulting in heightened efficiency and streamlined workflows.`;
    }).filter(Boolean).join('\n');

    return res.json({
      success: true,
      data: { enhancedBullets: enhanced }
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `Enhance these resume experience bullet points to be action-oriented, metrics-driven, and highly professional for a ${jobTitle || 'Role'}:
${text}

Requirements:
- Use strong action verbs (e.g., Spearheaded, Engineered, Optimized, Architected).
- Include quantifiable metric placeholders (e.g., by 35%, across 10+ teams) where relevant.
- Return each bullet point on a new line starting with a bullet character '•'.
- Do not output markdown codeblocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const enhanced = response.text?.trim() || text;
    return res.json({
      success: true,
      data: { enhancedBullets: enhanced }
    });
  } catch (err: any) {
    console.error('Gemini bullet enhancement error:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to enhance bullet points using AI'
    });
  }
};
