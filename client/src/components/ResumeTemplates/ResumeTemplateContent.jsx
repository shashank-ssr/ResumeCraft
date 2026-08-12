import {
    Mail,
    Phone,
    MapPin,
    Globe,
} from "lucide-react";

export default function ResumeTemplateContent({
    resume,
    variant = "modern",
}) {
    const personalInfo = resume.personalInfo || {};

    const enabledSections =
        resume.enabledSections || [
            "summary",
            "experience",
            "education",
            "projects",
            "skills",
        ];

    const hasContactInfo =
        personalInfo.email ||
        personalInfo.phone ||
        personalInfo.location ||
        personalInfo.linkedin ||
        personalInfo.github ||
        personalInfo.portfolio;

    const renderContact = () => (
        hasContactInfo && (
            <div className="template-contact">
                {personalInfo.email && (
                    <span>
                        <Mail size={11} />
                        {personalInfo.email}
                    </span>
                )}

                {personalInfo.phone && (
                    <span>
                        <Phone size={11} />
                        {personalInfo.phone}
                    </span>
                )}

                {personalInfo.location && (
                    <span>
                        <MapPin size={11} />
                        {personalInfo.location}
                    </span>
                )}

                {personalInfo.linkedin && (
                    <span>
                        LinkedIn: {personalInfo.linkedin}
                    </span>
                )}

                {personalInfo.github && (
                    <span>
                        GitHub: {personalInfo.github}
                    </span>
                )}

                {personalInfo.portfolio && (
                    <span>
                        <Globe size={11} />
                        {personalInfo.portfolio}
                    </span>
                )}
            </div>
        )
    );

    return (
        <>
            {variant === "photo" && personalInfo.photo && (
                <img
                    className="template-profile-photo"
                    src={personalInfo.photo}
                    alt="Profile"
                />
            )}

            <div className="template-identity">
                <h1>
                    {personalInfo.fullName ||
                        "Your Name"}
                </h1>

                <h2>
                    {personalInfo.jobTitle ||
                        "Professional Title"}
                </h2>

                {renderContact()}
            </div>

            {enabledSections.includes("summary") && (
                <section className="template-section">
                    <h3>Summary</h3>

                    {resume.summary ? (
                        <p>
                            {resume.summary}
                        </p>
                    ) : (
                        <p className="template-placeholder">
                            Your professional summary will appear here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes("experience") && (
                <section className="template-section">
                    <h3>Experience</h3>

                    {resume.experience?.length ? (
                        <div className="template-list">
                            {resume.experience.map(
                                (experience) => (
                                    <article
                                        className="template-item"
                                        key={experience.id}
                                    >
                                        <div className="template-item__top">
                                            <div>
                                                <h4>
                                                    {experience.jobTitle ||
                                                        "Job Title"}
                                                </h4>

                                                <p>
                                                    {experience.company ||
                                                        "Company"}

                                                    {experience.location
                                                        ? ` · ${experience.location}`
                                                        : ""}
                                                </p>
                                            </div>

                                            <span>
                                                {experience.startDate ||
                                                    "Start"}

                                                {" — "}

                                                {experience.currentlyWorking
                                                    ? "Present"
                                                    : experience.endDate ||
                                                      "End"}
                                            </span>
                                        </div>

                                        {experience.description && (
                                            <p>
                                                {
                                                    experience.description
                                                }
                                            </p>
                                        )}
                                    </article>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="template-placeholder">
                            Your work experience will appear here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes("education") && (
                <section className="template-section">
                    <h3>Education</h3>

                    {resume.education?.length ? (
                        <div className="template-list">
                            {resume.education.map(
                                (item) => (
                                    <article
                                        className="template-item"
                                        key={item.id}
                                    >
                                        <div className="template-item__top">
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

                                                {item.endDate ||
                                                    "End"}
                                            </span>
                                        </div>

                                        {item.grade && (
                                            <p className="template-grade">
                                                {item.grade}
                                            </p>
                                        )}

                                        {item.description && (
                                            <p>
                                                {
                                                    item.description
                                                }
                                            </p>
                                        )}
                                    </article>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="template-placeholder">
                            Your education will appear here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes("projects") && (
                <section className="template-section">
                    <h3>Projects</h3>

                    {resume.projects?.length ? (
                        <div className="template-list">
                            {resume.projects.map(
                                (project) => (
                                    <article
                                        className="template-item"
                                        key={project.id}
                                    >
                                        <div className="template-item__top">
                                            <div>
                                                <h4>
                                                    {project.name ||
                                                        "Project Name"}
                                                </h4>

                                                {project.technologies && (
                                                    <p className="template-technologies">
                                                        {
                                                            project.technologies
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {project.link && (
                                                <span>
                                                    {
                                                        project.link
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        {project.description && (
                                            <p>
                                                {
                                                    project.description
                                                }
                                            </p>
                                        )}
                                    </article>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="template-placeholder">
                            Your projects will appear here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes("skills") && (
                <section className="template-section">
                    <h3>Skills</h3>

                    {resume.skills?.length ? (
                        <div className="template-skills">
                            {resume.skills.map(
                                (skill) => (
                                    <div
                                        className="template-skill"
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
                                )
                            )}
                        </div>
                    ) : (
                        <p className="template-placeholder">
                            Your skills will appear here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes(
                "certifications"
            ) && (
                <section className="template-section">
                    <h3>Certifications</h3>

                    {resume.certifications?.length ? (
                        <div className="template-list">
                            {resume.certifications.map(
                                (item) => (
                                    <article
                                        className="template-item"
                                        key={item.id}
                                    >
                                        <h4>
                                            {item.name ||
                                                "Certification"}
                                        </h4>

                                        {item.issuer && (
                                            <p>
                                                {
                                                    item.issuer
                                                }
                                            </p>
                                        )}

                                        {item.date && (
                                            <span>
                                                {item.date}
                                            </span>
                                        )}

                                        {item.link && (
                                            <span>
                                                {item.link}
                                            </span>
                                        )}
                                    </article>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="template-placeholder">
                            Your certifications will appear here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes(
                "achievements"
            ) && (
                <section className="template-section">
                    <h3>Achievements</h3>

                    {resume.achievements?.length ? (
                        <div className="template-list">
                            {resume.achievements.map(
                                (item) => (
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
                                                {
                                                    item.description
                                                }
                                            </p>
                                        )}
                                    </article>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="template-placeholder">
                            Your achievements will appear here.
                        </p>
                    )}
                </section>
            )}

            {enabledSections.includes("languages") && (
                <section className="template-section">
                    <h3>Languages</h3>

                    {resume.languages?.length ? (
                        <div className="template-languages">
                            {resume.languages.map(
                                (language) => (
                                    <div
                                        className="template-language"
                                        key={language.id}
                                    >
                                        <strong>
                                            {language.name ||
                                                "Language"}
                                        </strong>

                                        {language.level && (
                                            <span>
                                                {
                                                    language.level
                                                }
                                            </span>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="template-placeholder">
                            Your languages will appear here.
                        </p>
                    )}
                </section>
            )}
        </>
    );
}