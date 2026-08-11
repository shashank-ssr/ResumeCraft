const {
  generateResumeContent,
} = require("../services/aiService");

async function generateAIContent(req, res) {
  try {
    const {
      type,
      resume,
      input,
    } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "AI generation type is required.",
      });
    }

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required.",
      });
    }

    const result = await generateResumeContent({
      type,
      resume,
      input,
    });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(
      "Gemini AI generation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to generate content right now.",
    });
  }
}

module.exports = {
  generateAIContent,
};