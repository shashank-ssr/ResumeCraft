const hasText = (value) =>
    String(value || "").trim().length > 0;

const hasAnyText = (item, fields) =>
    fields.some((field) => hasText(item?.[field]));

const filterItems = (items, fields) =>
    Array.isArray(items)
        ? items.filter((item) =>
              hasAnyText(item, fields)
          )
        : [];

const formatDateRange = (item) => {
    const start = item.startDate || "";
    const end = item.currentlyWorking
        ? "Present"
        : item.endDate || "";

    if (start && end) {
        return `${start} - ${end}`;
    }

    return start || end;
};

const normalizeSkills = (items) => {
    if (Array.isArray(items)) {
        return items.filter(hasText);
    }

    return String(items || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

export default function MinimalTemplate({ resume }) {
    const {
        personalInfo = {},
        summary = "",
        enabledSections = [],
    } = resume;

    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin,
        personalInfo.github,
        personalInfo.portfolio,
    ].filter(hasText);

    const experience = filterItems(
        resume.experience,
        [
            "jobTitle",
            "company",
            "location",
            "startDate",
            "endDate",
            "description",
        ]
    );

    const education = filterItems(
        resume.education,
        [
            "degree",
            "institution",
            "location",
            "startDate",
            "endDate",
            "grade",
            "description",
        ]
    );

    const projects = filterItems(
        resume.projects,
        [
            "name",
            "technologies",
            "link",
            "description",
        ]
    );

    const skills = filterItems(
        resume.skills,
        ["category", "items"]
    );

    const certifications = filterItems(
        resume.certifications,
        ["name", "issuer", "date"]
    );

    const achievements = filterItems(
        resume.achievements,
        ["title", "description"]
    );

    const languages = filterItems(
        resume.languages,
        ["name", "level", "proficiency"]
    );

    return (
        <div className="template template--minimal template--minimal-no-photo">
            <header className="minimal-header">
                <div className="minimal-header__content">
                    <h1>
                        {personalInfo.fullName || "Your Name"}
                    </h1>

                    <h2>
                        {personalInfo.jobTitle ||
                            "Professional Title"}
                    </h2>

                    {contactItems.length > 0 && (
                        <div className="minimal-header__contact">
                            {contactItems.map(
                                (item, index) => (
                                    <span
                                        key={`${item}-${index}`}
                                    >
                                        {item}
                                    </span>
                                )
                            )}
                        </div>
                    )}
                </div>
            </header>

            {enabledSections.includes("summary") &&
                hasText(summary) && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Profile</h3>
                            <span />
                        </div>

                        <p className="minimal-profile-text">
                            {summary}
                        </p>
                    </section>
                )}

            {enabledSections.includes("experience") &&
                experience.length > 0 && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Work Experience</h3>
                            <span />
                        </div>

                        <div className="minimal-entry-list">
                            {experience.map((item) => (
                                <article
                                    className="minimal-entry"
                                    key={item.id}
                                >
                                    <div className="minimal-entry__side">
                                        {hasText(
                                            item.company
                                        ) && (
                                            <strong>
                                                {
                                                    item.company
                                                }
                                            </strong>
                                        )}

                                        {hasText(
                                            item.location
                                        ) && (
                                            <span>
                                                {
                                                    item.location
                                                }
                                            </span>
                                        )}

                                        {formatDateRange(
                                            item
                                        ) && (
                                            <span>
                                                {formatDateRange(
                                                    item
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    <div className="minimal-entry__main">
                                        <h4>
                                            {item.jobTitle ||
                                                "Experience"}
                                        </h4>

                                        {hasText(
                                            item.description
                                        ) && (
                                            <div className="minimal-description">
                                                {item.description
                                                    .split("\n")
                                                    .filter(
                                                        hasText
                                                    )
                                                    .map(
                                                        (
                                                            line,
                                                            index
                                                        ) => (
                                                            <p
                                                                key={
                                                                    index
                                                                }
                                                            >
                                                                {
                                                                    line
                                                                }
                                                            </p>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

            {enabledSections.includes("education") &&
                education.length > 0 && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Education</h3>
                            <span />
                        </div>

                        <div className="minimal-entry-list">
                            {education.map((item) => (
                                <article
                                    className="minimal-entry"
                                    key={item.id}
                                >
                                    <div className="minimal-entry__side">
                                        {hasText(
                                            item.institution
                                        ) && (
                                            <strong>
                                                {
                                                    item.institution
                                                }
                                            </strong>
                                        )}

                                        {hasText(
                                            item.location
                                        ) && (
                                            <span>
                                                {
                                                    item.location
                                                }
                                            </span>
                                        )}

                                        {formatDateRange(
                                            item
                                        ) && (
                                            <span>
                                                {formatDateRange(
                                                    item
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    <div className="minimal-entry__main">
                                        <h4>
                                            {item.degree ||
                                                "Education"}
                                        </h4>

                                        {hasText(
                                            item.grade
                                        ) && (
                                            <p className="minimal-entry__meta">
                                                {
                                                    item.grade
                                                }
                                            </p>
                                        )}

                                        {hasText(
                                            item.description
                                        ) && (
                                            <p className="minimal-entry__description">
                                                {
                                                    item.description
                                                }
                                            </p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

            {enabledSections.includes("projects") &&
                projects.length > 0 && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Projects</h3>
                            <span />
                        </div>

                        <div className="minimal-project-list">
                            {projects.map((project) => (
                                <article
                                    className="minimal-project"
                                    key={project.id}
                                >
                                    <div className="minimal-project__header">
                                        <h4>
                                            {project.name ||
                                                "Project"}
                                        </h4>

                                        {hasText(
                                            project.link
                                        ) && (
                                            <span>
                                                {project.link}
                                            </span>
                                        )}
                                    </div>

                                    {hasText(
                                        project.technologies
                                    ) && (
                                        <p className="minimal-project__technology">
                                            {
                                                project.technologies
                                            }
                                        </p>
                                    )}

                                    {hasText(
                                        project.description
                                    ) && (
                                        <p className="minimal-entry__description">
                                            {
                                                project.description
                                            }
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

            {enabledSections.includes("skills") &&
                skills.length > 0 && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Skills</h3>
                            <span />
                        </div>

                        <div className="minimal-skills-grid">
                            {skills.map((skill) => {
                                const skillItems =
                                    normalizeSkills(
                                        skill.items
                                    );

                                return (
                                    <div
                                        className="minimal-skill-group"
                                        key={skill.id}
                                    >
                                        {hasText(
                                            skill.category
                                        ) && (
                                            <h4>
                                                {
                                                    skill.category
                                                }
                                            </h4>
                                        )}

                                        {skillItems.length >
                                            0 && (
                                            <div className="minimal-skill-items">
                                                {skillItems.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (
                                                        <span
                                                            key={
                                                                index
                                                            }
                                                        >
                                                            {
                                                                item
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

            {enabledSections.includes("certifications") &&
                certifications.length > 0 && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Certifications</h3>
                            <span />
                        </div>

                        <div className="minimal-certificate-list">
                            {certifications.map((item) => (
                                <article
                                    className="minimal-certificate"
                                    key={item.id}
                                >
                                    <div>
                                        <h4>
                                            {item.name ||
                                                "Certification"}
                                        </h4>

                                        {hasText(
                                            item.issuer
                                        ) && (
                                            <p>
                                                {
                                                    item.issuer
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {hasText(
                                        item.date
                                    ) && (
                                        <span>
                                            {item.date}
                                        </span>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

            {enabledSections.includes("achievements") &&
                achievements.length > 0 && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Achievements</h3>
                            <span />
                        </div>

                        <div className="minimal-achievement-list">
                            {achievements.map((item) => (
                                <article
                                    className="minimal-achievement"
                                    key={item.id}
                                >
                                    <h4>
                                        {item.title ||
                                            "Achievement"}
                                    </h4>

                                    {hasText(
                                        item.description
                                    ) && (
                                        <p>
                                            {
                                                item.description
                                            }
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

            {enabledSections.includes("languages") &&
                languages.length > 0 && (
                    <section className="minimal-section">
                        <div className="minimal-section__heading">
                            <h3>Languages</h3>
                            <span />
                        </div>

                        <div className="minimal-language-list">
                            {languages.map((language) => {
                                const level =
                                    language.level ||
                                    language.proficiency ||
                                    "";

                                return (
                                    <span
                                        className="minimal-language"
                                        key={language.id}
                                    >
                                        <strong>
                                            {language.name ||
                                                "Language"}
                                        </strong>

                                        {hasText(level) &&
                                            ` - ${level}`}
                                    </span>
                                );
                            })}
                        </div>
                    </section>
                )}
        </div>
    );
}
