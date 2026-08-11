import { Plus, Trash2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
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

  const addProject = () => {
    updateResume("projects", [
      ...projects,
      createProject(),
    ]);
  };

  const removeProject = (id) => {
    updateResume(
      "projects",
      projects.filter((project) => project.id !== id)
    );
  };

  const updateProject = (id, field, value) => {
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

  return (
    <section className="projects-section">
      <div className="section-header section-header--row">
        <div>
          <h2>Projects</h2>
          <p>
            Showcase projects that demonstrate your skills and experience.
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

          <h3>No projects added yet</h3>

          <p>
            Add academic, personal, freelance, or professional projects.
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
        {projects.map((project, index) => (
          <div className="project-card" key={project.id}>
            <div className="project-card__header">
              <span className="project-card__number">
                Project {index + 1}
              </span>

              <button
                type="button"
                className="delete-button"
                onClick={() => removeProject(project.id)}
                aria-label="Delete project"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Project Name</label>

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
                <label>Project Link</label>

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
                <label>Technologies</label>

                <input
                  type="text"
                  placeholder="React, Node.js, Express, MongoDB"
                  value={project.technologies}
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
                <label>Description</label>

                <textarea
                  rows="6"
                  placeholder="Describe what you built, how you built it, and the impact or key features..."
                  value={project.description}
                  onChange={(event) =>
                    updateProject(
                      project.id,
                      "description",
                      event.target.value
                    )
                  }
                />

                <div className="ai-placeholder">
                  ✨ AI project description assistance will be added here
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}