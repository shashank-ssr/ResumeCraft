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

import "./Projects.css";

const createProject = () => ({
  id: crypto.randomUUID(),
  name: "",
  description: "",
  technologies: "",
  link: "",
});

export default function Projects() {
  const { resume, updateResume } = useResume();

  const projects = resume.projects;

  const [generatingId, setGeneratingId] =
    useState(null);

  const [generatedContent, setGeneratedContent] =
    useState({});

  const [errors, setErrors] =
    useState({});

  const addProject = () => {
    updateResume("projects", [
      ...projects,
      createProject(),
    ]);
  };

  const removeProject = (id) => {
    updateResume(
      "projects",
      projects.filter(
        (project) => project.id !== id
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

  const updateProject = (
    id,
    field,
    value
  ) => {
    updateResume(
      "projects",
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]: value,
            }
          : project
      )
    );
  };

  const handleGenerateAI = async (
    project
  ) => {
    try {
      setGeneratingId(project.id);

      setErrors((previous) => ({
        ...previous,
        [project.id]: "",
      }));

      const result =
        await generateAIContent({
          type: "project",

          resume,

          input: `
Project Name:
${project.name}

Technologies:
${project.technologies}

Project Link:
${project.link}

Current Description:
${project.description}

Create a strong, professional and ATS-friendly
project description using only the information
provided above.
          `,
        });

      setGeneratedContent((previous) => ({
        ...previous,
        [project.id]: result,
      }));
    } catch (error) {
      console.error(
        "Project AI generation failed:",
        error
      );

      setErrors((previous) => ({
        ...previous,
        [project.id]:
          error.message ||
          "Unable to generate project description.",
      }));
    } finally {
      setGeneratingId(null);
    }
  };

  const handleUseGenerated = (
    projectId
  ) => {
    const content =
      generatedContent[projectId];

    if (!content) {
      return;
    }

    updateProject(
      projectId,
      "description",
      content
    );

    setGeneratedContent((previous) => {
      const updated = { ...previous };
      delete updated[projectId];
      return updated;
    });
  };

  const handleCancelGenerated = (
    projectId
  ) => {
    setGeneratedContent((previous) => {
      const updated = { ...previous };
      delete updated[projectId];
      return updated;
    });
  };

  return (
    <section className="projects-section">
      <div className="section-header section-header--row">
        <div>
          <h2>Projects</h2>

          <p>
            Showcase projects that demonstrate
            your skills and experience.
          </p>
        </div>

        <button
          type="button"
          className="add-section-button"
          onClick={addProject}
        >
          <Plus size={17} />

          Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="empty-section">
          <div className="empty-section__icon">
            <Plus size={20} />
          </div>

          <h3>
            No projects added yet
          </h3>

          <p>
            Add academic, personal,
            freelance, or professional
            projects.
          </p>

          <button
            type="button"
            className="empty-section__button"
            onClick={addProject}
          >
            Add your first project
          </button>
        </div>
      )}

      <div className="projects-list">
        {projects.map(
          (project, index) => {
            const isGenerating =
              generatingId === project.id;

            const generated =
              generatedContent[
                project.id
              ];

            const error =
              errors[project.id];

            return (
              <div
                className="project-card"
                key={project.id}
              >
                <div className="project-card__header">
                  <span className="project-card__number">
                    Project {index + 1}
                  </span>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() =>
                      removeProject(
                        project.id
                      )
                    }
                    aria-label="Delete project"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label>
                      Project Name
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. ResumeCraft"
                      value={project.name}
                      onChange={(event) =>
                        updateProject(
                          project.id,
                          "name",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Project Link
                    </label>

                    <input
                      type="text"
                      placeholder="github.com/username/project"
                      value={project.link}
                      onChange={(event) =>
                        updateProject(
                          project.id,
                          "link",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="form-field form-field--full">
                    <label>
                      Technologies
                    </label>

                    <input
                      type="text"
                      placeholder="React, Node.js, Express, MongoDB"
                      value={
                        project.technologies
                      }
                      onChange={(event) =>
                        updateProject(
                          project.id,
                          "technologies",
                          event.target.value
                        )
                      }
                    />
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
                            project
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
                      placeholder="Describe what you built, how you built it, and the impact or key features..."
                      value={
                        project.description
                      }
                      onChange={(event) =>
                        updateProject(
                          project.id,
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
                              Suggested Project Description
                            </h3>
                          </div>

                          <button
                            type="button"
                            className="ai-result__close"
                            onClick={() =>
                              handleCancelGenerated(
                                project.id
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
                                project.id
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
                                project.id
                              )
                            }
                          >
                            <Check size={16} />

                            Use this description
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