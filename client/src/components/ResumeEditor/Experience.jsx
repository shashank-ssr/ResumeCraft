import {
  Check,
  LoaderCircle,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { useState } from "react";

import { useResume } from "../../context/ResumeContext";
import { generateAIContent } from "../../services/aiService";

import "./Experience.css";

const createExperience = () => ({
  id: crypto.randomUUID(),
  jobTitle: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
});

export default function Experience() {
  const { resume, updateResume } = useResume();

  const experiences = resume.experience;

  const [generatingId, setGeneratingId] =
    useState(null);

  const [generatedContent, setGeneratedContent] =
    useState({});

  const [errors, setErrors] = useState({});

  const addExperience = () => {
    updateResume("experience", [
      ...experiences,
      createExperience(),
    ]);
  };

  const removeExperience = (id) => {
    updateResume(
      "experience",
      experiences.filter(
        (experience) =>
          experience.id !== id
      )
    );

    setGeneratedContent((previous) => {
      const updated = { ...previous };
      delete updated[id];
      return updated;
    });

    setErrors((previous) => {
      const updated = { ...previous };
      delete updated[id];
      return updated;
    });
  };

  const updateExperience = (
    id,
    field,
    value
  ) => {
    updateResume(
      "experience",
      experiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              [field]: value,
            }
          : experience
      )
    );
  };

  const handleGenerateAI = async (
    experience
  ) => {
    try {
      setGeneratingId(experience.id);

      setErrors((previous) => ({
        ...previous,
        [experience.id]: "",
      }));

      const result =
        await generateAIContent({
          type: "experience",

          resume,

          input: `
Job Title: ${experience.jobTitle}

Company: ${experience.company}

Location: ${experience.location}

Start Date: ${experience.startDate}

End Date: ${
            experience.currentlyWorking
              ? "Present"
              : experience.endDate
          }

Current Description:
${experience.description}

Improve this work experience into strong,
professional, ATS-friendly resume bullet points.
          `,
        });

      setGeneratedContent((previous) => ({
        ...previous,
        [experience.id]: result,
      }));
    } catch (error) {
      console.error(
        "Experience AI generation failed:",
        error
      );

      setErrors((previous) => ({
        ...previous,
        [experience.id]:
          error.message ||
          "Unable to generate content.",
      }));
    } finally {
      setGeneratingId(null);
    }
  };

  const handleUseGenerated = (
    experienceId
  ) => {
    const content =
      generatedContent[experienceId];

    if (!content) {
      return;
    }

    updateExperience(
      experienceId,
      "description",
      content
    );

    setGeneratedContent((previous) => {
      const updated = { ...previous };
      delete updated[experienceId];
      return updated;
    });
  };

  const handleCancelGenerated = (
    experienceId
  ) => {
    setGeneratedContent((previous) => {
      const updated = { ...previous };
      delete updated[experienceId];
      return updated;
    });
  };

  return (
    <section className="experience-section">
      <div className="section-header section-header--row">
        <div>
          <h2>Work Experience</h2>

          <p>
            Add your relevant work experience,
            internships, or freelance work.
          </p>
        </div>

        <button
          type="button"
          className="add-section-button"
          onClick={addExperience}
        >
          <Plus size={17} />

          Add Experience
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="empty-section">
          <div className="empty-section__icon">
            <Plus size={20} />
          </div>

          <h3>No experience added yet</h3>

          <p>
            Add your work experience or
            internship to strengthen your
            resume.
          </p>

          <button
            type="button"
            className="empty-section__button"
            onClick={addExperience}
          >
            Add your first experience
          </button>
        </div>
      )}

      <div className="experience-list">
        {experiences.map(
          (experience, index) => {
            const isGenerating =
              generatingId ===
              experience.id;

            const generated =
              generatedContent[
                experience.id
              ];

            const error =
              errors[experience.id];

            return (
              <div
                className="experience-card"
                key={experience.id}
              >
                <div className="experience-card__header">
                  <div>
                    <span className="experience-card__number">
                      Experience {index + 1}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() =>
                      removeExperience(
                        experience.id
                      )
                    }
                    aria-label="Delete experience"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-field form-field--full">
                    <label>
                      Job Title
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Frontend Developer"
                      value={
                        experience.jobTitle
                      }
                      onChange={(event) =>
                        updateExperience(
                          experience.id,
                          "jobTitle",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Company
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. ABC Technologies"
                      value={
                        experience.company
                      }
                      onChange={(event) =>
                        updateExperience(
                          experience.id,
                          "company",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Location
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Jaipur, India"
                      value={
                        experience.location
                      }
                      onChange={(event) =>
                        updateExperience(
                          experience.id,
                          "location",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Start Date
                    </label>

                    <input
                      type="month"
                      value={
                        experience.startDate
                      }
                      onChange={(event) =>
                        updateExperience(
                          experience.id,
                          "startDate",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      End Date
                    </label>

                    <input
                      type="month"
                      disabled={
                        experience.currentlyWorking
                      }
                      value={
                        experience.endDate
                      }
                      onChange={(event) =>
                        updateExperience(
                          experience.id,
                          "endDate",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-field form-field--full">
                    <label className="checkbox-field">
                      <input
                        type="checkbox"
                        checked={
                          experience.currentlyWorking
                        }
                        onChange={(event) =>
                          updateExperience(
                            experience.id,
                            "currentlyWorking",
                            event.target.checked
                          )
                        }
                      />

                      <span>
                        I currently work here
                      </span>
                    </label>
                  </div>

                  <div className="form-field form-field--full">
                    <div className="description-header">
                      <label>
                        Description
                      </label>

                      <button
                        type="button"
                        className="ai-button"
                        onClick={() =>
                          handleGenerateAI(
                            experience
                          )
                        }
                        disabled={
                          isGenerating
                        }
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
                            <Sparkles
                              size={15}
                            />

                            Generate with AI
                          </>
                        )}
                      </button>
                    </div>

                    <textarea
                      rows="6"
                      placeholder="Describe your responsibilities, achievements, and impact..."
                      value={
                        experience.description
                      }
                      onChange={(event) =>
                        updateExperience(
                          experience.id,
                          "description",
                          event.target.value
                        )
                      }
                    />

                    {error && (
                      <div className="ai-error">
                        {error}
                      </div>
                    )}

                    {generated && (
                      <div className="ai-result">
                        <div className="ai-result__header">
                          <div>
                            <span className="ai-result__label">
                              AI Generated
                            </span>

                            <h3>
                              Suggested Experience
                            </h3>
                          </div>

                          <button
                            type="button"
                            className="ai-result__close"
                            onClick={() =>
                              handleCancelGenerated(
                                experience.id
                              )
                            }
                            aria-label="Close AI suggestion"
                          >
                            <X size={17} />
                          </button>
                        </div>

                        <div className="ai-result__content">
                          {generated}
                        </div>

                        <div className="ai-result__actions">
                          <button
                            type="button"
                            className="ai-result__cancel"
                            onClick={() =>
                              handleCancelGenerated(
                                experience.id
                              )
                            }
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            className="ai-result__use"
                            onClick={() =>
                              handleUseGenerated(
                                experience.id
                              )
                            }
                          >
                            <Check size={16} />

                            Use this
                            description
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}