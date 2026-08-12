export default function MinimalTemplate({ resume }) {
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

    const hasContactInfo =
        personalInfo.email ||
        personalInfo.phone ||
        personalInfo.location ||
        personalInfo.linkedin ||
        personalInfo.github ||
        personalInfo.portfolio;

    return (
        <div className="template template--minimal">
            <header className="minimal-header">
                <div>
                    <h1>
                        {personalInfo.fullName || "Your Name"}
                    </h1>

                    <h2>
                        {personalInfo.jobTitle ||
                            "Professional Title"}
                    </h2>
                </div>

                {personalInfo.photo && (
                    <img
                        src={personalInfo.photo}
                        alt="Profile"
                        className="template-photo template-photo--minimal"
                    />
                )}
            </header>

            {hasContactInfo && (
                <div className="minimal-contact">
                    {personalInfo.email && (
                        <span>{personalInfo.email}</span>
                    )}

                    {personalInfo.phone && (
                        <span>{personalInfo.phone}</span>
                    )}

                    {personalInfo.location && (
                        <span>{personalInfo.location}</span>
                    )}

                    {personalInfo.linkedin && (
                        <span>{personalInfo.linkedin}</span>
                    )}

                    {personalInfo.github && (
                        <span>{personalInfo.github}</span>
                    )}

                    {personalInfo.portfolio && (
                        <span>{personalInfo.portfolio}</span>
                    )}
                </div>
            )}

            {enabledSections.includes("summary") && (
                <section className="minimal-section">
                    <h3>Summary</h3>

                    {summary ? (
                        <p>{summary}</p>
                    ) : (
                        <p className="template-placeholder">
                            Your professional summary will appear
                            here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes("experience") && (
                <section className="minimal-section">
                    <h3>Experience</h3>

                    {experience.length === 0 ? (
                        <p className="template-placeholder">
                            Your work experience will appear here.
                        </p>
                    ) : (
                        experience.map((item) => (
                            <article
                                className="minimal-item"
                                key={item.id}
                            >
                                <div className="minimal-item__top">
                                    <div>
                                        <h4>
                                            {item.jobTitle ||
                                                "Job Title"}
                                        </h4>

                                        <p>
                                            {item.company ||
                                                "Company"}

                                            {item.location
                                                ? ` · ${item.location}`
                                                : ""}
                                        </p>
                                    </div>

                                    <span>
                                        {item.startDate ||
                                            "Start"}

                                        {" — "}

                                        {item.currentlyWorking
                                            ? "Present"
                                            : item.endDate ||
                                              "End"}
                                    </span>
                                </div>

                                {item.description && (
                                    <p className="minimal-description">
                                        {item.description}
                                    </p>
                                )}
                            </article>
                        ))
                    )}
                </section>
            )}

            {enabledSections.includes("education") && (
                <section className="minimal-section">
                    <h3>Education</h3>

                    {education.length === 0 ? (
                        <p className="template-placeholder">
                            Your education will appear here.
                        </p>
                    ) : (
                        education.map((item) => (
                            <article
                                className="minimal-item"
                                key={item.id}
                            >
                                <div className="minimal-item__top">
                                    <div>
                                        <h4>
                                            {item.degree ||
                                                "Degree / Qualification"}
                                        </h4>

                                        <p>
                                            {item.institution ||
                                                "Institution"}

                                            {item.location
                                                ? ` · ${item.location}`
                                                : ""}
                                        </p>
                                    </div>

                                    <span>
                                        {item.startDate ||
                                            "Start"}

                                        {" — "}

                                        {item.endDate || "End"}
                                    </span>
                                </div>

                                {item.grade && (
                                    <p className="minimal-meta">
                                        {item.grade}
                                    </p>
                                )}

                                {item.description && (
                                    <p className="minimal-description">
                                        {item.description}
                                    </p>
                                )}
                            </article>
                        ))
                    )}
                </section>
            )}

            {enabledSections.includes("projects") && (
                <section className="minimal-section">
                    <h3>Projects</h3>

                    {projects.length === 0 ? (
                        <p className="template-placeholder">
                            Your projects will appear here.
                        </p>
                    ) : (
                        projects.map((project) => (
                            <article
                                className="minimal-item"
                                key={project.id}
                            >
                                <div className="minimal-item__top">
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
                                    <p className="minimal-description">
                                        {project.description}
                                    </p>
                                )}
                            </article>
                        ))
                    )}
                </section>
            )}

            {enabledSections.includes("skills") && (
                <section className="minimal-section">
                    <h3>Skills</h3>

                    {skills.length === 0 ? (
                        <p className="template-placeholder">
                            Your skills will appear here.
                        </p>
                    ) : (
                        <div className="minimal-skills">
                            {skills.map((skill) => (
                                <div
                                    className="minimal-skill"
                                    key={skill.id}
                                >
                                    <strong>
                                        {skill.category ||
                                            "Skills"}
                                    </strong>

                                    <span>
                                        {skill.items ||
                                            "Add your skills"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {enabledSections.includes("certifications") && (
                <section className="minimal-section">
                    <h3>Certifications</h3>

                    {certifications.map((item) => (
                        <article
                            className="minimal-item"
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
                                <span>{item.date}</span>
                            )}
                        </article>
                    ))}
                </section>
            )}

            {enabledSections.includes("achievements") && (
                <section className="minimal-section">
                    <h3>Achievements</h3>

                    {achievements.map((item) => (
                        <article
                            className="minimal-item"
                            key={item.id}
                        >
                            <h4>
                                {item.title ||
                                    "Achievement"}
                            </h4>

                            {item.description && (
                                <p className="minimal-description">
                                    {item.description}
                                </p>
                            )}
                        </article>
                    ))}
                </section>
            )}

            {enabledSections.includes("languages") && (
                <section className="minimal-section">
                    <h3>Languages</h3>

                    <div className="minimal-languages">
                        {languages.map((language) => (
                            <span key={language.id}>
                                <strong>
                                    {language.name ||
                                        "Language"}
                                </strong>

                                {language.level &&
                                    ` — ${language.level}`}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}