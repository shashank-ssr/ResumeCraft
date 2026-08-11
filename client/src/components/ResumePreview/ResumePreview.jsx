import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import "./ResumePreview.css";

export default function ResumePreview() {
    const { resume } = useResume();

    const { personalInfo } = resume;

    const hasContactInfo =
        personalInfo.email ||
        personalInfo.phone ||
        personalInfo.location ||
        personalInfo.linkedin ||
        personalInfo.github ||
        personalInfo.portfolio;

    return (
        <div className="resume-preview-wrapper">
            <div className="resume-preview">
                <header className="resume-preview__header">
                    <h1>
                        {personalInfo.fullName || "Your Name"}
                    </h1>

                    <h2>
                        {personalInfo.jobTitle || "Professional Title"}
                    </h2>

                    {hasContactInfo && (
                        <div className="resume-preview__contact">
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
                    )}
                </header>

                <section className="resume-preview__section">
                    <h3>Summary</h3>

                    {resume.summary ? (
                        <p className="resume-preview__summary">
                            {resume.summary}
                        </p>
                    ) : (
                        <p className="resume-preview__placeholder">
                            Your professional summary will appear here.
                        </p>
                    )}
                </section>

                <section className="resume-preview__section">
                    <h3>Experience</h3>

                    {resume.experience.length === 0 ? (
                        <p className="resume-preview__placeholder">
                            Your work experience will appear here.
                        </p>
                    ) : (
                        <div className="preview-experience-list">
                            {resume.experience.map((experience) => (
                                <article
                                    className="preview-experience"
                                    key={experience.id}
                                >
                                    <div className="preview-experience__top">
                                        <div>
                                            <h4>
                                                {experience.jobTitle || "Job Title"}
                                            </h4>

                                            <p>
                                                {experience.company || "Company"}
                                                {experience.location
                                                    ? ` · ${experience.location}`
                                                    : ""}
                                            </p>
                                        </div>

                                        <span>
                                            {experience.startDate || "Start"}
                                            {" — "}
                                            {experience.currentlyWorking
                                                ? "Present"
                                                : experience.endDate || "End"}
                                        </span>
                                    </div>

                                    {experience.description && (
                                        <p className="preview-experience__description">
                                            {experience.description}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className="resume-preview__section">
                    <h3>Education</h3>

                    {resume.education.length === 0 ? (
                        <p className="resume-preview__placeholder">
                            Your education will appear here.
                        </p>
                    ) : (
                        <div className="preview-education-list">
                            {resume.education.map((item) => (
                                <article
                                    className="preview-education"
                                    key={item.id}
                                >
                                    <div className="preview-education__top">
                                        <div>
                                            <h4>
                                                {item.degree || "Degree / Qualification"}
                                            </h4>

                                            <p>
                                                {item.institution || "Institution"}
                                                {item.location
                                                    ? ` · ${item.location}`
                                                    : ""}
                                            </p>
                                        </div>

                                        <span>
                                            {item.startDate || "Start"}
                                            {" — "}
                                            {item.endDate || "End"}
                                        </span>
                                    </div>

                                    {item.grade && (
                                        <p className="preview-education__grade">
                                            {item.grade}
                                        </p>
                                    )}

                                    {item.description && (
                                        <p className="preview-education__description">
                                            {item.description}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className="resume-preview__section">
                    <h3>Projects</h3>

                    {resume.projects.length === 0 ? (
                        <p className="resume-preview__placeholder">
                            Your projects will appear here.
                        </p>
                    ) : (
                        <div className="preview-project-list">
                            {resume.projects.map((project) => (
                                <article
                                    className="preview-project"
                                    key={project.id}
                                >
                                    <div className="preview-project__top">
                                        <div>
                                            <h4>
                                                {project.name || "Project Name"}
                                            </h4>

                                            {project.technologies && (
                                                <p className="preview-project__technologies">
                                                    {project.technologies}
                                                </p>
                                            )}
                                        </div>

                                        {project.link && (
                                            <span className="preview-project__link">
                                                {project.link}
                                            </span>
                                        )}
                                    </div>

                                    {project.description && (
                                        <p className="preview-project__description">
                                            {project.description}
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className="resume-preview__section">
                    <h3>Skills</h3>

                    {resume.skills.length === 0 ? (
                        <p className="resume-preview__placeholder">
                            Your skills will appear here.
                        </p>
                    ) : (
                        <div className="preview-skills-list">
                            {resume.skills.map((skill) => (
                                <div
                                    className="preview-skill-group"
                                    key={skill.id}
                                >
                                    <strong>
                                        {skill.category || "Skills"}
                                    </strong>

                                    <span>
                                        {skill.items || "Add your skills"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}