export default function TemplateContent({
    resume,
    variant = "",
}) {
    const {
        personalInfo,
        summary,
        experience = [],
        education = [],
        projects = [],
        skills = [],
        certifications = [],
        achievements = [],
        languages = [],
        enabledSections = [],
    } = resume;

    const sectionEnabled = (section) =>
        enabledSections.includes(section);

    return (
        <>
            {sectionEnabled("summary") && summary && (
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

                        {experience.map((item) => (
                            <article
                                className="template-item"
                                key={item.id}
                            >
                                <div className="template-item__header">
                                    <div>
                                        <h4>
                                            {item.jobTitle ||
                                                "Job Title"}
                                        </h4>

                                        <p>
                                            {item.company ||
                                                "Company"}

                                            {item.location &&
                                                ` · ${item.location}`}
                                        </p>
                                    </div>

                                    <span>
                                        {item.startDate}

                                        {" — "}

                                        {item.currentlyWorking
                                            ? "Present"
                                            : item.endDate}
                                    </span>
                                </div>

                                {item.description && (
                                    <p>
                                        {item.description}
                                    </p>
                                )}
                            </article>
                        ))}
                    </section>
                )}

            {sectionEnabled("education") &&
                education.length > 0 && (
                    <section className="template-section">
                        <h3>Education</h3>

                        {education.map((item) => (
                            <article
                                className="template-item"
                                key={item.id}
                            >
                                <div className="template-item__header">
                                    <div>
                                        <h4>
                                            {item.degree ||
                                                "Degree / Qualification"}
                                        </h4>

                                        <p>
                                            {item.institution ||
                                                "Institution"}

                                            {item.location &&
                                                ` · ${item.location}`}
                                        </p>
                                    </div>

                                    <span>
                                        {item.startDate}

                                        {" — "}

                                        {item.endDate}
                                    </span>
                                </div>

                                {item.grade && (
                                    <strong>
                                        {item.grade}
                                    </strong>
                                )}

                                {item.description && (
                                    <p>
                                        {item.description}
                                    </p>
                                )}
                            </article>
                        ))}
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
                                                "Project Name"}
                                        </h4>

                                        {project.technologies && (
                                            <p>
                                                {
                                                    project.technologies
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {project.link && (
                                        <span>
                                            {project.link}
                                        </span>
                                    )}
                                </div>

                                {project.description && (
                                    <p>
                                        {project.description}
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
                                    <strong>
                                        {skill.category ||
                                            "Skills"}
                                        :
                                    </strong>

                                    <span>
                                        {skill.items}
                                    </span>
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
                                <h4>
                                    {item.name ||
                                        "Certification"}
                                </h4>

                                {item.issuer && (
                                    <p>{item.issuer}</p>
                                )}

                                {item.date && (
                                    <span>
                                        {item.date}
                                    </span>
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

                                {item.description && (
                                    <p>
                                        {item.description}
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
                            {languages.map((item) => (
                                <span key={item.id}>
                                    <strong>
                                        {item.name}
                                    </strong>

                                    {item.level &&
                                        ` — ${item.level}`}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
        </>
    );
}