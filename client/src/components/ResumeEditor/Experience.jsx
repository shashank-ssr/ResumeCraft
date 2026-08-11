import { Plus, Trash2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
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

  const addExperience = () => {
    updateResume("experience", [
      ...experiences,
      createExperience(),
    ]);
  };

  const removeExperience = (id) => {
    updateResume(
      "experience",
      experiences.filter((experience) => experience.id !== id)
    );
  };

  const updateExperience = (id, field, value) => {
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

  return (
    <section className="experience-section">
      <div className="section-header section-header--row">
        <div>
          <h2>Work Experience</h2>
          <p>
            Add your relevant work experience, internships, or freelance work.
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
            Add your work experience or internship to strengthen your resume.
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
        {experiences.map((experience, index) => (
          <div className="experience-card" key={experience.id}>
            <div className="experience-card__header">
              <div>
                <span className="experience-card__number">
                  Experience {index + 1}
                </span>
              </div>

              <button
                type="button"
                className="delete-button"
                onClick={() => removeExperience(experience.id)}
                aria-label="Delete experience"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-field form-field--full">
                <label>Job Title</label>

                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={experience.jobTitle}
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
                <label>Company</label>

                <input
                  type="text"
                  placeholder="e.g. ABC Technologies"
                  value={experience.company}
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
                <label>Location</label>

                <input
                  type="text"
                  placeholder="e.g. Jaipur, India"
                  value={experience.location}
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
                <label>Start Date</label>

                <input
                  type="month"
                  value={experience.startDate}
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
                <label>End Date</label>

                <input
                  type="month"
                  disabled={experience.currentlyWorking}
                  value={experience.endDate}
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
                    checked={experience.currentlyWorking}
                    onChange={(event) =>
                      updateExperience(
                        experience.id,
                        "currentlyWorking",
                        event.target.checked
                      )
                    }
                  />

                  <span>I currently work here</span>
                </label>
              </div>

              <div className="form-field form-field--full">
                <label>Description</label>

                <textarea
                  rows="6"
                  placeholder="Describe your responsibilities, achievements, and impact..."
                  value={experience.description}
                  onChange={(event) =>
                    updateExperience(
                      experience.id,
                      "description",
                      event.target.value
                    )
                  }
                />

                <div className="ai-placeholder">
                  ✨ AI assistance will be available here
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}