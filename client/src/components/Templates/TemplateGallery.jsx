import { Check } from "lucide-react";

import { useResume } from "../../context/ResumeContext";

import "./Templates.css";

const templateOptions = [
    {
        id: "modern",
        name: "Modern",
        description:
            "Clean and professional layout for most careers.",
        photo: false,
    },
    {
        id: "classic",
        name: "Classic",
        description:
            "Traditional resume style with a timeless appearance.",
        photo: false,
    },
    {
        id: "minimal",
        name: "Minimal",
        description:
            "Simple typography-focused resume with lots of clarity.",
        photo: false,
    },
    {
        id: "executive",
        name: "Executive",
        description:
            "Strong professional design for experienced candidates.",
        photo: false,
    },
    {
        id: "creative-photo",
        name: "Creative",
        description:
            "Creative two-column layout with profile photo.",
        photo: true,
    },
    {
        id: "modern-photo",
        name: "Modern Photo",
        description:
            "Modern professional layout with profile photo.",
        photo: true,
    },
];

export default function TemplateGallery() {
    const { resume, setTemplate } = useResume();

    return (
        <section className="template-gallery">
            <div className="template-gallery__header">
                <div>
                    <span>Resume Templates</span>

                    <h2>
                        Choose your resume style
                    </h2>

                    <p>
                        Select a template. Your resume
                        content will automatically adapt.
                    </p>
                </div>
            </div>

            <div className="template-gallery__grid">
                {templateOptions.map((template) => {
                    const selected =
                        resume.template === template.id;

                    return (
                        <button
                            type="button"
                            key={template.id}
                            className={`template-card ${
                                selected
                                    ? "template-card--selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setTemplate(template.id)
                            }
                        >
                            <div className="template-card__preview">
                                <div
                                    className={`template-mini-preview template-mini-preview--${template.id}`}
                                >
                                    <div className="mini-header" />

                                    <div className="mini-line" />
                                    <div className="mini-line mini-line--short" />

                                    <div className="mini-section" />
                                    <div className="mini-section" />
                                    <div className="mini-section" />

                                    {template.photo && (
                                        <div className="mini-photo">
                                            Photo
                                        </div>
                                    )}
                                </div>

                                {selected && (
                                    <div className="template-card__check">
                                        <Check size={15} />
                                    </div>
                                )}
                            </div>

                            <div className="template-card__content">
                                <div>
                                    <h3>
                                        {template.name}
                                    </h3>

                                    <p>
                                        {template.description}
                                    </p>
                                </div>

                                {template.photo && (
                                    <span className="template-card__badge">
                                        Photo
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}