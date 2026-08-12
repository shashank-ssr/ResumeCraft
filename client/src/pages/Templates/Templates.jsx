import {
    Check,
    Camera,
    FileText,
    Sparkles,
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";

import "./ResumeTemplates.css";

const templates = [
    {
        id: "modern",
        name: "Modern",
        description: "Clean and professional layout for modern job applications.",
        category: "Without Photo",
        hasPhoto: false,
        className: "template-card__preview--modern",
    },
    {
        id: "classic",
        name: "Classic",
        description: "Traditional resume design with a strong professional structure.",
        category: "Without Photo",
        hasPhoto: false,
        className: "template-card__preview--classic",
    },
    {
        id: "minimal",
        name: "Minimal",
        description: "Simple, elegant and highly readable resume layout.",
        category: "Without Photo",
        hasPhoto: false,
        className: "template-card__preview--minimal",
    },
    {
        id: "professional",
        name: "Professional",
        description: "Structured design suitable for corporate applications.",
        category: "Without Photo",
        hasPhoto: false,
        className: "template-card__preview--professional",
    },
    {
        id: "creative",
        name: "Creative",
        description: "A visually distinctive layout for creative and technical profiles.",
        category: "With Photo",
        hasPhoto: true,
        className: "template-card__preview--creative",
    },
    {
        id: "elegant",
        name: "Elegant",
        description: "Polished two-column design with a professional photo section.",
        category: "With Photo",
        hasPhoto: true,
        className: "template-card__preview--elegant",
    },
];

export default function Templates() {
    const { resume, updateResume } = useResume();

    const selectedTemplate = resume.template || "modern";

    const handleSelectTemplate = (template) => {
        updateResume("template", template.id);

        // Photo templates automatically enable photo mode.
        updateResume("photoEnabled", template.hasPhoto);
    };

    return (
        <main className="templates-page">
            <section className="templates-hero">
                <div className="templates-hero__content">
                    <span className="templates-hero__eyebrow">
                        <Sparkles size={14} />
                        Resume Templates
                    </span>

                    <h1>
                        Choose a resume template
                        <span> that fits you.</span>
                    </h1>

                    <p>
                        Pick a professional design and then customize
                        your resume in the builder. You can switch
                        templates at any time.
                    </p>
                </div>
            </section>

            <section className="templates-content">
                <div className="templates-toolbar">
                    <div>
                        <h2>Templates</h2>

                        <p>
                            {templates.length} professional designs
                            available
                        </p>
                    </div>

                    <div className="templates-toolbar__hint">
                        <FileText size={16} />
                        Your information stays the same when switching
                        templates.
                    </div>
                </div>

                <div className="templates-grid">
                    {templates.map((template) => {
                        const isSelected =
                            selectedTemplate === template.id;

                        return (
                            <article
                                className={`template-card ${
                                    isSelected
                                        ? "template-card--selected"
                                        : ""
                                }`}
                                key={template.id}
                            >
                                <div
                                    className={`template-card__preview ${template.className}`}
                                >
                                    <TemplateMockup
                                        template={template}
                                        resume={resume}
                                    />
                                </div>

                                <div className="template-card__body">
                                    <div className="template-card__title-row">
                                        <div>
                                            <h3>{template.name}</h3>

                                            <span className="template-card__category">
                                                {template.hasPhoto ? (
                                                    <>
                                                        <Camera
                                                            size={12}
                                                        />
                                                        With Photo
                                                    </>
                                                ) : (
                                                    <>
                                                        <FileText
                                                            size={12}
                                                        />
                                                        Without Photo
                                                    </>
                                                )}
                                            </span>
                                        </div>

                                        {isSelected && (
                                            <span className="template-card__selected">
                                                <Check size={13} />
                                                Selected
                                            </span>
                                        )}
                                    </div>

                                    <p>
                                        {template.description}
                                    </p>

                                    <button
                                        type="button"
                                        className={`template-card__button ${
                                            isSelected
                                                ? "template-card__button--selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSelectTemplate(
                                                template
                                            )
                                        }
                                    >
                                        {isSelected
                                            ? "Selected"
                                            : "Use this template"}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}

function TemplateMockup({ template, resume }) {
    const name =
        resume.personalInfo?.fullName || "Your Name";

    const title =
        resume.personalInfo?.jobTitle ||
        "Professional Title";

    return (
        <div className="template-mockup">
            {template.hasPhoto && (
                <div className="template-mockup__photo">
                    {resume.photo ? (
                        <img
                            src={resume.photo}
                            alt=""
                        />
                    ) : (
                        <Camera size={18} />
                    )}
                </div>
            )}

            <div className="template-mockup__header">
                <div className="template-mockup__name">
                    {name}
                </div>

                <div className="template-mockup__title">
                    {title}
                </div>

                <div className="template-mockup__contact">
                    email@example.com · +91 98765 43210
                </div>
            </div>

            <div className="template-mockup__section">
                <span />
                <span />
                <span />
            </div>

            <div className="template-mockup__section">
                <span />
                <span />
                <span />
                <span />
            </div>

            <div className="template-mockup__section">
                <span />
                <span />
                <span />
            </div>

            {template.hasPhoto && (
                <div className="template-mockup__side">
                    <span />
                    <span />
                    <span />
                </div>
            )}
        </div>
    );
}