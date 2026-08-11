import { Plus, Trash2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import "./Skills.css";

const createSkillGroup = () => ({
  id: crypto.randomUUID(),
  category: "",
  items: "",
});

export default function Skills() {
  const { resume, updateResume } = useResume();

  const skills = resume.skills;

  const addSkillGroup = () => {
    updateResume("skills", [
      ...skills,
      createSkillGroup(),
    ]);
  };

  const removeSkillGroup = (id) => {
    updateResume(
      "skills",
      skills.filter((skill) => skill.id !== id)
    );
  };

  const updateSkillGroup = (id, field, value) => {
    updateResume(
      "skills",
      skills.map((skill) =>
        skill.id === id
          ? {
              ...skill,
              [field]: value,
            }
          : skill
      )
    );
  };

  return (
    <section className="skills-section">
      <div className="section-header section-header--row">
        <div>
          <h2>Skills</h2>
          <p>
            Organize your skills into clear categories.
          </p>
        </div>

        <button
          type="button"
          className="add-section-button"
          onClick={addSkillGroup}
        >
          <Plus size={17} />
          Add Skill Group
        </button>
      </div>

      {skills.length === 0 && (
        <div className="empty-section">
          <div className="empty-section__icon">
            <Plus size={20} />
          </div>

          <h3>No skills added yet</h3>

          <p>
            Add technical or professional skills to your resume.
          </p>

          <button
            type="button"
            className="empty-section__button"
            onClick={addSkillGroup}
          >
            Add your first skill group
          </button>
        </div>
      )}

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div className="skill-card" key={skill.id}>
            <div className="skill-card__header">
              <span>
                Skill Group {index + 1}
              </span>

              <button
                type="button"
                className="delete-button"
                onClick={() => removeSkillGroup(skill.id)}
                aria-label="Delete skill group"
              >
                <Trash2 size={17} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Category</label>

                <input
                  type="text"
                  placeholder="e.g. Frontend"
                  value={skill.category}
                  onChange={(event) =>
                    updateSkillGroup(
                      skill.id,
                      "category",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label>Skills</label>

                <input
                  type="text"
                  placeholder="React, JavaScript, CSS"
                  value={skill.items}
                  onChange={(event) =>
                    updateSkillGroup(
                      skill.id,
                      "items",
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