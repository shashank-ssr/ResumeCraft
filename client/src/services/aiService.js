const API_URL = "http://localhost:5000/api";

export async function generateAIContent({
  type,
  resume,
  input = "",
}) {
  const response = await fetch(
    `${API_URL}/ai/generate`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        type,
        resume,
        input,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to generate AI content."
    );
  }

  return data.result;
}