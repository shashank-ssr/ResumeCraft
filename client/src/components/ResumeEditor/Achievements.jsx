import { Plus, Trash2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import "./Achievements.css";

const createAchievement = () => ({
    id: crypto.randomUUID(),
    title: "",
    organization: "",
    date: "",
    description: "",
});

export default function Achievements() {
    const { resume, updateResume } = useResume();

    const achievements = resume.achievements || [];

    const addAchievement = () => {
        updateResume("achievements", [
            ...achievements,
            createAchievement(),
        ]);
    };

    const removeAchievement = (id) => {
        updateResume(
            "achievements",
            achievements.filter(
                (achievement) =>
                    achievement.id !== id
            )
        );
    };

    const updateAchievement = (
        id,
        field,
        value
    ) => {
        updateResume(
            "achievements",
            achievements.map((achievement) =>
                achievement.id === id
                    ? {
                          ...achievement,
                          [field]: value,
                      }
                    : achievement
            )
        );
    };

    return (
        <section className="achievements-section">
            <div className="section-header section-header--row">
                <div>
                    <h2>Achievements</h2>

                    <p>
                        Highlight awards, accomplishments,
                        competitions, and recognitions.
                    </p>
                </div>

                <button
                    type="button"
                    className="add-section-button"
                    onClick={addAchievement}
                >
                    <Plus size={17} />
                    Add Achievement
                </button>
            </div>

            {achievements.length === 0 && (
                <div className="empty-section">
                    <div className="empty-section__icon">
                        <Plus size={20} />
                    </div>

                    <h3>
                        No achievements added yet
                    </h3>

                    <p>
                        Add awards, accomplishments,
                        competitions, or recognitions.
                    </p>

                    <button
                        type="button"
                        className="empty-section__button"
                        onClick={addAchievement}
                    >
                        Add your first achievement
                    </button>
                </div>
            )}

            <div className="achievements-list">
                {achievements.map(
                    (achievement, index) => (
                        <div
                            className="achievement-card"
                            key={achievement.id}
                        >
                            <div className="achievement-card__header">
                                <span className="achievement-card__number">
                                    Achievement{" "}
                                    {index + 1}
                                </span>

                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() =>
                                        removeAchievement(
                                            achievement.id
                                        )
                                    }
                                    aria-label="Delete achievement"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>

                            <div className="form-grid">
                                <div className="form-field">
                                    <label>
                                        Achievement Title
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Winner - Hackathon 2026"
                                        value={
                                            achievement.title
                                        }
                                        onChange={(event) =>
                                            updateAchievement(
                                                achievement.id,
                                                "title",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field">
                                    <label>
                                        Organization
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Poornima University"
                                        value={
                                            achievement.organization
                                        }
                                        onChange={(event) =>
                                            updateAchievement(
                                                achievement.id,
                                                "organization",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field form-field--full">
                                    <label>
                                        Date
                                    </label>

                                    <input
                                        type="month"
                                        value={
                                            achievement.date
                                        }
                                        onChange={(event) =>
                                            updateAchievement(
                                                achievement.id,
                                                "date",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field form-field--full">
                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        rows="5"
                                        placeholder="Describe the achievement, result, or impact..."
                                        value={
                                            achievement.description
                                        }
                                        onChange={(event) =>
                                            updateAchievement(
                                                achievement.id,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}