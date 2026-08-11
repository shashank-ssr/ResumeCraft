import {
  Check,
  LoaderCircle,
  Sparkles,
  X,
} from "lucide-react";

import { useState } from "react";

import { useResume } from "../../context/ResumeContext";

import { generateAIContent } from "../../services/aiService";

import "./Summary.css";

export default function Summary() {
  const { resume, updateResume } = useResume();

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [generatedText, setGeneratedText] =
    useState("");

  const [error, setError] =
    useState("");

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError("");

      const result = await generateAIContent({
        type: "summary",

        resume,

        input:
          "Create a strong professional resume summary based on my resume.",
      });

      setGeneratedText(result);
    } catch (error) {
      console.error(
        "AI generation failed:",
        error
      );

      setError(
        error.message ||
          "Unable to generate content."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseGenerated = () => {
    updateResume(
      "summary",
      generatedText
    );

    setGeneratedText("");
  };

  const handleCancelGenerated = () => {
    setGeneratedText("");
  };

  return (
    <section className="summary-section">
      <div className="section-header">
        <h2>Professional Summary</h2>

        <p>
          Write a short introduction that highlights
          your experience, strengths, and career goals.
        </p>
      </div>

      <div className="summary-editor">
        <div className="summary-editor__top">
          <label htmlFor="resume-summary">
            Summary
          </label>

          <button
            type="button"
            className="ai-button"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <LoaderCircle
                  size={15}
                  className="ai-spinner"
                />

                Generating...
              </>
            ) : (
              <>
                <Sparkles size={15} />

                Generate with AI
              </>
            )}
          </button>
        </div>

        <textarea
          id="resume-summary"
          rows="7"
          maxLength={800}
          placeholder="Example: Motivated software developer with experience building full-stack web applications using React, Node.js, Express, and MongoDB..."
          value={resume.summary}
          onChange={(event) =>
            updateResume(
              "summary",
              event.target.value
            )
          }
        />

        <div className="summary-editor__footer">
          <span>
            Keep it concise and focused on your
            strongest qualities.
          </span>

          <span>
            {resume.summary.length}/800
          </span>
        </div>

        {error && (
          <div className="ai-error">
            {error}
          </div>
        )}

        {generatedText && (
          <div className="ai-result">
            <div className="ai-result__header">
              <div>
                <span className="ai-result__label">
                  AI Generated
                </span>

                <h3>
                  Suggested Summary
                </h3>
              </div>

              <button
                type="button"
                className="ai-result__close"
                onClick={
                  handleCancelGenerated
                }
                aria-label="Close AI suggestion"
              >
                <X size={17} />
              </button>
            </div>

            <div className="ai-result__content">
              {generatedText}
            </div>

            <div className="ai-result__actions">
              <button
                type="button"
                className="ai-result__cancel"
                onClick={
                  handleCancelGenerated
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ai-result__use"
                onClick={
                  handleUseGenerated
                }
              >
                <Check size={16} />

                Use this summary
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}