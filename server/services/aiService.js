const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing. Check your server/.env file."
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

const model = "gemini-3.6-flash";

async function generateResumeContent({
  type,
  resume,
  input = "",
}) {
  const prompts = {
    summary: `
You are a professional resume writer.

Create a professional resume summary using ONLY the information provided by the candidate.

Candidate information:
${JSON.stringify(resume, null, 2)}

Additional request:
${input}

Requirements:
- 3 to 4 sentences.
- Professional and concise.
- ATS-friendly.
- Highlight relevant skills, education, projects, and experience.
- Do not invent experience, achievements, numbers, companies, technologies, or qualifications.
- Do not use first-person pronouns.
- Return ONLY the final summary.
`,

    experience: `
You are an expert resume writer.

Improve the candidate's work experience description.

Candidate information:
${JSON.stringify(resume, null, 2)}

Current experience description:
${input}

Requirements:
- Produce 3 to 5 strong resume bullet points.
- Start bullets with strong action verbs.
- Focus on responsibilities, technical work, impact, and achievements.
- Use measurable results only when provided.
- Never invent numbers or achievements.
- ATS-friendly.
- Return ONLY the bullet points.
`,

    project: `
You are an expert technical resume writer.

Create a professional resume project description.

Candidate information:
${JSON.stringify(resume, null, 2)}

Project information:
${input}

Requirements:
- Produce 2 to 4 concise resume bullet points.
- Explain what was built.
- Mention relevant technologies.
- Highlight important functionality and outcomes.
- Use strong action verbs.
- Do not invent information.
- ATS-friendly.
- Return ONLY the bullet points.
`,

    skills: `
You are an expert technical resume assistant.

Suggest relevant skills based ONLY on the candidate's existing information.

Candidate information:
${JSON.stringify(resume, null, 2)}

User request:
${input}

Requirements:
- Suggest relevant technical or professional skills.
- Do not invent unsupported skills.
- Avoid duplicates.
- Return a simple comma-separated list.
- Return ONLY the list.
`,
  };

  const prompt = prompts[type];

  if (!prompt) {
    throw new Error(
      `Unsupported AI generation type: ${type}`
    );
  }

  const interaction = await ai.interactions.create({
    model,
    input: prompt,
  });

  return interaction.output_text?.trim() || "";
}

module.exports = {
  generateResumeContent,
};