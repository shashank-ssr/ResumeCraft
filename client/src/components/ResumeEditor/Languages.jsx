import { Plus, Trash2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import "./Languages.css";

const createLanguage = () => ({
    id: crypto.randomUUID(),
    name: "",
    proficiency: "Intermediate",
});

export default function Languages() {
    const { resume, updateResume } = useResume();

    const languages = resume.languages || [];

    const addLanguage = () => {
        updateResume("languages", [
            ...languages,
            createLanguage(),
        ]);
    };

    const removeLanguage = (id) => {
        updateResume(
            "languages",
            languages.filter(
                (language) =>
                    language.id !== id
            )
        );
    };

    const updateLanguage = (
        id,
        field,
        value
    ) => {
        updateResume(
            "languages",
            languages.map((language) =>
                language.id === id
                    ? {
                          ...language,
                          [field]: value,
                      }
                    : language
            )
        );
    };

    return (
        <section className="languages-section">
            <div className="section-header section-header--row">
                <div>
                    <h2>Languages</h2>

                    <p>
                        Add languages you speak and your
                        proficiency level.
                    </p>
                </div>

                <button
                    type="button"
                    className="add-section-button"
                    onClick={addLanguage}
                >
                    <Plus size={17} />
                    Add Language
                </button>
            </div>

            {languages.length === 0 && (
                <div className="empty-section">
                    <div className="empty-section__icon">
                        <Plus size={20} />
                    </div>

                    <h3>
                        No languages added yet
                    </h3>

                    <p>
                        Add the languages you speak or
                        understand.
                    </p>

                    <button
                        type="button"
                        className="empty-section__button"
                        onClick={addLanguage}
                    >
                        Add your first language
                    </button>
                </div>
            )}

            <div className="languages-list">
                {languages.map(
                    (language, index) => (
                        <div
                            className="language-card"
                            key={language.id}
                        >
                            <div className="language-card__header">
                                <span className="language-card__number">
                                    Language{" "}
                                    {index + 1}
                                </span>

                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() =>
                                        removeLanguage(
                                            language.id
                                        )
                                    }
                                    aria-label="Delete language"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>

                            <div className="form-grid">
                                <div className="form-field">
                                    <label>
                                        Language
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. English"
                                        value={
                                            language.name
                                        }
                                        onChange={(event) =>
                                            updateLanguage(
                                                language.id,
                                                "name",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field">
                                    <label>
                                        Proficiency
                                    </label>

                                    <select
                                        value={
                                            language.proficiency
                                        }
                                        onChange={(event) =>
                                            updateLanguage(
                                                language.id,
                                                "proficiency",
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="Native">
                                            Native
                                        </option>

                                        <option value="Fluent">
                                            Fluent
                                        </option>

                                        <option value="Advanced">
                                            Advanced
                                        </option>

                                        <option value="Intermediate">
                                            Intermediate
                                        </option>

                                        <option value="Basic">
                                            Basic
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}