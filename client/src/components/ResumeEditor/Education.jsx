import { Plus, Trash2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import "./Education.css";

const createEducation = () => ({
  id: crypto.randomUUID(),
  degree: "",
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  grade: "",
  description: "",
});

export default function Education() {
  const { resume, updateResume } = useResume();

  const education = resume.education;

  const addEducation = () => {
    updateResume("education", [
      ...education,
      createEducation(),
    ]);
  };

  const removeEducation = (id) => {
    updateResume(
      "education",
      education.filter((item) => item.id !== id)
    );
  };

  const updateEducation = (id, field, value) => {
    updateResume(
      "education",
      education.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  return (
    <section className="education-section">
      <div className="section-header section-header--row">
        <div>
          <h2>Education</h2>
          <p>
            Add your degrees, certifications, or other relevant education.
          </p>
        </div>

        <button
          type="button"
          className="add-section-button"
          onClick={addEducation}
        >
          <Plus size={17} />
          Add Education
        </button>
      </div>

      {education.length === 0 && (
        <div className="empty-section">
          <div className="empty-section__icon">
            <Plus size={20} />
          </div>

          <h3>No education added yet</h3>

          <p>
            Add your academic background to your resume.
          </p>

          <button
            type="button"
            className="empty-section__button"
            onClick={addEducation}
          >
            Add your first education
          </button>
        </div>
      )}

      <div className="education-list">
        {education.map((item, index) => (
          <div className="education-card" key={item.id}>
            <div className="education-card__header">
              <span className="education-card__number">
                Education {index + 1}
              </span>

              <button
                type="button"
                className="delete-button"
                onClick={() => removeEducation(item.id)}
                aria-label="Delete education"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-field form-field--full">
                <label>Degree / Qualification</label>

                <input
                  type="text"
                  placeholder="e.g. Master of Computer Applications"
                  value={item.degree}
                  onChange={(event) =>
                    updateEducation(
                      item.id,
                      "degree",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label>Institution</label>

                <input
                  type="text"
                  placeholder="e.g. Poornima University"
                  value={item.institution}
                  onChange={(event) =>
                    updateEducation(
                      item.id,
                      "institution",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label>Location</label>

                <input
                  type="text"
                  placeholder="e.g. Jaipur, Rajasthan"
                  value={item.location}
                  onChange={(event) =>
                    updateEducation(
                      item.id,
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
                  value={item.startDate}
                  onChange={(event) =>
                    updateEducation(
                      item.id,
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
                  value={item.endDate}
                  onChange={(event) =>
                    updateEducation(
                      item.id,
                      "endDate",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label>Grade / CGPA</label>

                <input
                  type="text"
                  placeholder="e.g. 8.5 CGPA"
                  value={item.grade}
                  onChange={(event) =>
                    updateEducation(
                      item.id,
                      "grade",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-field form-field--full">
                <label>Additional Details</label>

                <textarea
                  rows="4"
                  placeholder="Relevant coursework, achievements, activities, etc."
                  value={item.description}
                  onChange={(event) =>
                    updateEducation(
                      item.id,
                      "description",
                      event.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}