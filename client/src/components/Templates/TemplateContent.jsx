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

const getDateRange = (item) => {
    const start = item.startDate || "";
    const end = item.currentlyWorking
        ? "Present"
        : item.endDate || "";

    if (start && end) {
        return `${start} - ${end}`;
    }

    return start || end;
};

const getLocationMeta = (...parts) =>
    parts.filter(hasText).join(" - ");

export default function TemplateContent({
    resume,
}) {
    const {
        summary = "",
        enabledSections = [],
    } = resume;

    const sectionEnabled = (section) =>
        enabledSections.includes(section);

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
        ["name", "issuer", "date", "link"]
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
        <>
            {sectionEnabled("summary") &&
                hasText(summary) && (
                    <section className="template-section">
                        <h3>Summary</h3>

                        <p className="template-summary">
                            {summary}
                        </p>
                    </section>
                )}

            {sectionEnabled("experience") &&
                experience.length > 0 && (
                    <section className="template-section">
                        <h3>Experience</h3>

                        {experience.map((item) => {
                            const companyMeta =
                                getLocationMeta(
                                    item.company,
                                    item.location
                                );

                            const dateRange =
                                getDateRange(item);

                            return (
                                <article
                                    className="template-item"
                                    key={item.id}
                                >
                                    <div className="template-item__header">
                                        <div>
                                            <h4>
                                                {item.jobTitle ||
                                                    "Experience"}
                                            </h4>

                                            {companyMeta && (
                                                <p>
                                                    {
                                                        companyMeta
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {dateRange && (
                                            <span>
                                                {dateRange}
                                            </span>
                                        )}
                                    </div>

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
                            );
                        })}
                    </section>
                )}

            {sectionEnabled("education") &&
                education.length > 0 && (
                    <section className="template-section">
                        <h3>Education</h3>

                        {education.map((item) => {
                            const schoolMeta =
                                getLocationMeta(
                                    item.institution,
                                    item.location
                                );

                            const dateRange =
                                getDateRange(item);

                            return (
                                <article
                                    className="template-item"
                                    key={item.id}
                                >
                                    <div className="template-item__header">
                                        <div>
                                            <h4>
                                                {item.degree ||
                                                    "Education"}
                                            </h4>

                                            {schoolMeta && (
                                                <p>
                                                    {
                                                        schoolMeta
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {dateRange && (
                                            <span>
                                                {dateRange}
                                            </span>
                                        )}
                                    </div>

                                    {hasText(
                                        item.grade
                                    ) && (
                                        <strong>
                                            {item.grade}
                                        </strong>
                                    )}

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
                            );
                        })}
                    </section>
                )}

            {sectionEnabled("projects") &&
                projects.length > 0 && (
                    <section className="template-section">
                        <h3>Projects</h3>

                        {projects.map((project) => (
                            <article
                                className="template-item"
                                key={project.id}
                            >
                                <div className="template-item__header">
                                    <div>
                                        <h4>
                                            {project.name ||
                                                "Project"}
                                        </h4>

                                        {hasText(
                                            project.technologies
                                        ) && (
                                            <p>
                                                {
                                                    project.technologies
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {hasText(
                                        project.link
                                    ) && (
                                        <span>
                                            {project.link}
                                        </span>
                                    )}
                                </div>

                                {hasText(
                                    project.description
                                ) && (
                                    <p>
                                        {
                                            project.description
                                        }
                                    </p>
                                )}
                            </article>
                        ))}
                    </section>
                )}

            {sectionEnabled("skills") &&
                skills.length > 0 && (
                    <section className="template-section">
                        <h3>Skills</h3>

                        <div className="template-skills">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="template-skill"
                                >
                                    {hasText(
                                        skill.category
                                    ) && (
                                        <strong>
                                            {
                                                skill.category
                                            }
                                        </strong>
                                    )}

                                    {hasText(
                                        skill.items
                                    ) && (
                                        <span>
                                            {skill.items}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            {sectionEnabled("certifications") &&
                certifications.length > 0 && (
                    <section className="template-section">
                        <h3>Certifications</h3>

                        {certifications.map((item) => (
                            <article
                                className="template-item"
                                key={item.id}
                            >
                                <div className="template-item__header">
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
                                </div>

                                {hasText(item.link) && (
                                    <p>
                                        {item.link}
                                    </p>
                                )}
                            </article>
                        ))}
                    </section>
                )}

            {sectionEnabled("achievements") &&
                achievements.length > 0 && (
                    <section className="template-section">
                        <h3>Achievements</h3>

                        {achievements.map((item) => (
                            <article
                                className="template-item"
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
                    </section>
                )}

            {sectionEnabled("languages") &&
                languages.length > 0 && (
                    <section className="template-section">
                        <h3>Languages</h3>

                        <div className="template-languages">
                            {languages.map((item) => {
                                const level =
                                    item.level ||
                                    item.proficiency ||
                                    "";

                                return (
                                    <span key={item.id}>
                                        <strong>
                                            {item.name ||
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
        </>
    );
}
