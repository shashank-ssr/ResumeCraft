import {
    BriefcaseBusiness,
    FolderKanban,
    Award,
    Trophy,
    Languages,
    FileText,
    GraduationCap,
    Wrench,
    Plus,
    X,
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";

import "./SectionManager.css";

const sections = [
    {
        id: "summary",
        title: "Professional Summary",
        description: "Short introduction about you",
        icon: FileText,
    },
    {
        id: "experience",
        title: "Experience",
        description: "Work experience, internships, or freelance work",
        icon: BriefcaseBusiness,
    },
    {
        id: "education",
        title: "Education",
        description: "Degrees, qualifications, and academic background",
        icon: GraduationCap,
    },
    {
        id: "projects",
        title: "Projects",
        description: "Personal, academic, or professional projects",
        icon: FolderKanban,
    },
    {
        id: "skills",
        title: "Skills",
        description: "Technical and professional skills",
        icon: Wrench,
    },
    {
        id: "certifications",
        title: "Certifications",
        description: "Professional certifications and courses",
        icon: Award,
    },
    {
        id: "achievements",
        title: "Achievements",
        description: "Awards, accomplishments, and recognitions",
        icon: Trophy,
    },
    {
        id: "languages",
        title: "Languages",
        description: "Languages you speak or understand",
        icon: Languages,
    },
];

export default function SectionManager() {
    const {
        resume,
        addSection,
        removeSection,
    } = useResume();

    const enabledSections = resume.enabledSections || [];

    const availableSections = sections.filter(
        (section) =>
            !enabledSections.includes(section.id)
    );

    const activeSections = sections.filter(
        (section) =>
            enabledSections.includes(section.id)
    );

    return (
        <section className="section-manager">
            <div className="section-manager__header">
                <div>
                    <span className="section-manager__eyebrow">
                        Customize
                    </span>

                    <h2>Add or remove sections</h2>

                    <p>
                        Choose the sections you want to include
                        in your resume.
                    </p>
                </div>
            </div>

            {availableSections.length > 0 && (
                <div className="section-manager__group">
                    <span className="section-manager__label">
                        Add a section
                    </span>

                    <div className="section-manager__list">
                        {availableSections.map((section) => {
                            const Icon = section.icon;

                            return (
                                <button
                                    key={section.id}
                                    type="button"
                                    className="section-manager__item"
                                    onClick={() =>
                                        addSection(section.id)
                                    }
                                >
                                    <span className="section-manager__icon">
                                        <Icon size={16} />
                                    </span>

                                    <span className="section-manager__content">
                                        <strong>
                                            {section.title}
                                        </strong>

                                        <small>
                                            {section.description}
                                        </small>
                                    </span>

                                    <Plus size={17} />
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {activeSections.length > 0 && (
                <div className="section-manager__group">
                    <span className="section-manager__label">
                        Included sections
                    </span>

                    <div className="section-manager__list">
                        {activeSections.map((section) => {
                            const Icon = section.icon;

                            return (
                                <div
                                    key={section.id}
                                    className="section-manager__item section-manager__item--active"
                                >
                                    <span className="section-manager__icon">
                                        <Icon size={16} />
                                    </span>

                                    <span className="section-manager__content">
                                        <strong>
                                            {section.title}
                                        </strong>

                                        <small>
                                            Included in your resume
                                        </small>
                                    </span>

                                    <button
                                        type="button"
                                        className="section-manager__remove"
                                        onClick={() =>
                                            removeSection(
                                                section.id
                                            )
                                        }
                                        aria-label={`Remove ${section.title}`}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="section-manager__note">
                <strong>Tip:</strong> Only include sections that
                strengthen your resume. You can add or remove them
                anytime.
            </div>
        </section>
    );
}