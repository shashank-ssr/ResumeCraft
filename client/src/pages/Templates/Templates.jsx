import {
    Check,
    Camera,
    FileText,
    Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useResume } from "../../context/ResumeContext";

import ModernTemplate from "../../components/Templates/ModernTemplate";
import ClassicTemplate from "../../components/Templates/ClassicTemplate";
import MinimalTemplate from "../../components/Templates/MinimalTemplate";
import ProfessionalTemplate from "../../components/Templates/ProfessionalTemplate";
import CreativeTemplate from "../../components/Templates/CreativeTemplate";
import ModernPhotoTemplate from "../../components/Templates/ModernPhotoTemplate";
import ExecutiveTemplate from "../../components/Templates/ExecutiveTemplate";

import "./ResumeTemplates.css";
import "../../components/Templates/Templates.css";

const templates = [
    {
        id: "modern",
        name: "Modern",
        description:
            "Clean and professional layout for modern job applications.",
        category: "Without Photo",
        hasPhoto: false,
        component: ModernTemplate,
    },
    {
        id: "classic",
        name: "Classic",
        description:
            "Traditional resume design with a strong professional structure.",
        category: "Without Photo",
        hasPhoto: false,
        component: ClassicTemplate,
    },
    {
        id: "minimal",
        name: "Minimal",
        description:
            "Simple, elegant and highly readable resume layout.",
        category: "Without Photo",
        hasPhoto: false,
        component: MinimalTemplate,
    },
    {
        id: "professional",
        name: "Professional",
        description:
            "Structured design suitable for corporate applications.",
        category: "Without Photo",
        hasPhoto: false,
        component: ProfessionalTemplate,
    },
    {
        id: "creative",
        name: "Creative",
        description:
            "Distinctive two-column design for creative and technical profiles.",
        category: "With Photo",
        hasPhoto: true,
        component: CreativeTemplate,
    },
    {
        id: "modern-photo",
        name: "Modern Photo",
        description:
            "Modern professional resume with an integrated profile photo.",
        category: "With Photo",
        hasPhoto: true,
        component: ModernPhotoTemplate,
    },
    {
        id: "executive",
        name: "Executive",
        description:
            "Strong professional layout designed for experienced candidates.",
        category: "Without Photo",
        hasPhoto: false,
        component: ExecutiveTemplate,
    },
];

/*
=========================================================
DEMO RESUME
Used only inside template cards.

The user's real resume is NOT modified.
=========================================================
*/

const demoResume = {
    personalInfo: {
        fullName: "Shashank Singh Rajput",
        jobTitle: "MERN Stack Developer",
        email: "shashank@example.com",
        phone: "+91 98765 43210",
        location: "India",
        linkedin: "linkedin.com/in/shashank",
        github: "github.com/shashank-ssr",
        portfolio: "shashank.dev",

        // If user has uploaded a photo, use it.
        // Otherwise templates can display their own placeholder.
        photo: "",
    },

    summary:
        "MERN Stack Developer passionate about building modern, responsive and scalable web applications using React, Node.js, Express and MongoDB.",

    experience: [
        {
            id: "demo-exp-1",
            jobTitle: "Full Stack Developer Intern",
            company: "Tech Solutions",
            location: "India",
            startDate: "2025",
            endDate: "2026",
            currentlyWorking: false,
            description:
                "Developed responsive React interfaces and REST APIs. Worked with MongoDB and Express to build scalable application features.",
        },
        {
            id: "demo-exp-2",
            jobTitle: "Web Developer",
            company: "Freelance",
            location: "Remote",
            startDate: "2024",
            endDate: "2025",
            currentlyWorking: false,
            description:
                "Created modern websites and web applications with a focus on performance, usability and responsive design.",
        },
    ],

    education: [
        {
            id: "demo-edu-1",
            degree: "Master of Computer Applications",
            institution: "Poornima University",
            location: "India",
            startDate: "2025",
            endDate: "2027",
            grade: "8.2 CGPA",
            description: "",
        },
        {
            id: "demo-edu-2",
            degree: "Bachelor of Computer Applications",
            institution: "VNSGU",
            location: "India",
            startDate: "2021",
            endDate: "2024",
            grade: "7.96 CGPA",
            description: "",
        },
    ],

    projects: [
        {
            id: "demo-project-1",
            name: "ResumeCraft",
            technologies:
                "React · Node.js · Express · MongoDB",
            link: "github.com/shashank-ssr",
            description:
                "A modern resume builder that allows users to create, customize and download professional resumes.",
        },
        {
            id: "demo-project-2",
            name: "CampusHire",
            technologies:
                "React · Express · MongoDB",
            link: "github.com/shashank-ssr",
            description:
                "A campus recruitment platform connecting students with companies and job opportunities.",
        },
    ],

    skills: [
        {
            id: "demo-skill-1",
            category: "Frontend",
            items: "React, JavaScript, HTML, CSS, Vite",
        },
        {
            id: "demo-skill-2",
            category: "Backend",
            items: "Node.js, Express, REST APIs",
        },
        {
            id: "demo-skill-3",
            category: "Database",
            items: "MongoDB, SQL",
        },
    ],

    certifications: [
        {
            id: "demo-cert-1",
            name: "Full Stack Web Development",
            issuer: "Professional Certification",
            date: "2025",
        },
    ],

    achievements: [
        {
            id: "demo-achievement-1",
            title: "Built Multiple Full Stack Applications",
            description:
                "Designed and developed production-style applications using modern web technologies.",
        },
    ],

    languages: [
        {
            id: "demo-lang-1",
            name: "English",
            level: "Professional",
        },
        {
            id: "demo-lang-2",
            name: "Hindi",
            level: "Native",
        },
    ],

    enabledSections: [
        "summary",
        "experience",
        "education",
        "projects",
        "skills",
        "certifications",
        "achievements",
        "languages",
    ],
};

/*
=========================================================
PHOTO DEMO
=========================================================
*/

function getPreviewResume(resume, template) {
    const currentPhoto =
        resume.personalInfo?.photo || "";

    return {
        ...demoResume,

        ...resume,

        personalInfo: {
            ...demoResume.personalInfo,
            ...resume.personalInfo,

            /*
             * Use user's uploaded photo when available.
             * Otherwise keep the demo empty so the template's
             * placeholder is shown.
             */
            photo:
                currentPhoto ||
                demoResume.personalInfo.photo,
        },

        /*
         * Always show complete demo content in the gallery.
         * User data is used for identity where available.
         */
        summary:
            resume.summary || demoResume.summary,

        experience:
            resume.experience?.length
                ? resume.experience
                : demoResume.experience,

        education:
            resume.education?.length
                ? resume.education
                : demoResume.education,

        projects:
            resume.projects?.length
                ? resume.projects
                : demoResume.projects,

        skills:
            resume.skills?.length
                ? resume.skills
                : demoResume.skills,

        certifications:
            resume.certifications?.length
                ? resume.certifications
                : demoResume.certifications,

        achievements:
            resume.achievements?.length
                ? resume.achievements
                : demoResume.achievements,

        languages:
            resume.languages?.length
                ? resume.languages
                : demoResume.languages,

        enabledSections: demoResume.enabledSections,
        template: template.id,
    };
}

/*
=========================================================
REAL TEMPLATE PREVIEW
=========================================================
*/

function TemplatePreview({ template, resume }) {
    const TemplateComponent = template.component;

    const previewResume = getPreviewResume(
        resume,
        template
    );

    return (
        <div className="template-preview-window">
            <div className="template-preview-paper">
                <TemplateComponent
                    resume={previewResume}
                />
            </div>
        </div>
    );
}

/*
=========================================================
PAGE
=========================================================
*/

export default function Templates() {
    const { resume, setTemplate } =
        useResume();

    const navigate = useNavigate();

    const selectedTemplate =
        resume.template || "modern";

    const handleSelectTemplate = (template) => {
        /*
         * Store the selected template in ResumeContext.
         */
        setTemplate(template.id);

        /*
         * Immediately take user to builder.
         */
        navigate("/builder");
    };

    return (
        <main className="templates-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="templates-hero">

                <div className="templates-hero__content">

                    <span className="templates-hero__eyebrow">
                        <Sparkles size={14} />
                        Resume Templates
                    </span>

                    <h1>
                        Choose a resume template
                        <span>
                            {" "}that fits you.
                        </span>
                    </h1>

                    <p>
                        Pick a professional design and
                        customize your resume in the builder.
                        Your information stays the same when
                        switching templates.
                    </p>

                </div>

            </section>

            {/* =====================================================
                TEMPLATE SECTION
            ===================================================== */}

            <section className="templates-content">

                <div className="templates-toolbar">

                    <div>
                        <h2>
                            Templates
                        </h2>

                        <p>
                            {templates.length} professional
                            designs available
                        </p>
                    </div>

                    <div className="templates-toolbar__hint">
                        <FileText size={15} />

                        <span>
                            Your resume content stays the
                            same when switching templates.
                        </span>
                    </div>

                </div>

                {/* =================================================
                    GRID
                ================================================= */}

                <div className="templates-grid">

                    {templates.map((template) => {

                        const isSelected =
                            selectedTemplate ===
                            template.id;

                        return (
                            <article
                                key={template.id}
                                className={`template-card ${
                                    isSelected
                                        ? "template-card--selected"
                                        : ""
                                }`}
                            >

                                {/* ===============================
                                    PREVIEW
                                =============================== */}

                                <div className="template-card__preview-area">

                                    <TemplatePreview
                                        template={template}
                                        resume={resume}
                                    />

                                    {/* Hover overlay */}

                                    <div className="template-card__overlay">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSelectTemplate(
                                                    template
                                                )
                                            }
                                        >
                                            {isSelected
                                                ? "Edit this template"
                                                : "Use this template"}
                                        </button>

                                    </div>

                                    {/* Selected */}

                                    {isSelected && (
                                        <div className="template-card__selected">

                                            <Check
                                                size={13}
                                            />

                                            Selected

                                        </div>
                                    )}

                                </div>

                                {/* ===============================
                                    CARD CONTENT
                                =============================== */}

                                <div className="template-card__body">

                                    <div className="template-card__title-row">

                                        <div>

                                            <h3>
                                                {template.name}
                                            </h3>

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

                                    </div>

                                    <p>
                                        {
                                            template.description
                                        }
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
                                            ? "Edit Template"
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