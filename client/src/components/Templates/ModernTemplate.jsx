import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Linkedin,
    Github,
} from "lucide-react";

import TemplateContent from "./TemplateContent";

export default function ModernTemplate({ resume }) {
    const personalInfo = resume.personalInfo || {};

    const fullName =
        personalInfo.fullName || "Your Name";

    const jobTitle =
        personalInfo.jobTitle || "Professional Title";

    const contactItems = [
        {
            value: personalInfo.email,
            icon: Mail,
        },
        {
            value: personalInfo.phone,
            icon: Phone,
        },
        {
            value: personalInfo.location,
            icon: MapPin,
        },
        {
            value: personalInfo.portfolio,
            icon: Globe,
        },
        {
            value: personalInfo.linkedin,
            icon: Linkedin,
        },
        {
            value: personalInfo.github,
            icon: Github,
        },
    ].filter((item) => item.value);

    return (
        <div className="resume-template template-modern">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="modern-header">
                <div className="modern-header__accent" />

                <div className="modern-header__content">
                    <div className="modern-header__identity">
                        <span className="modern-header__eyebrow">
                            PROFESSIONAL RESUME
                        </span>

                        <h1>{fullName}</h1>

                        <h2>{jobTitle}</h2>
                    </div>

                    {contactItems.length > 0 && (
                        <div className="modern-contact">
                            {contactItems.map(
                                (
                                    {
                                        value,
                                        icon: Icon,
                                    },
                                    index
                                ) => (
                                    <span
                                        key={`${value}-${index}`}
                                        className="modern-contact__item"
                                    >
                                        <Icon
                                            size={11}
                                            strokeWidth={1.8}
                                        />

                                        <span>
                                            {value}
                                        </span>
                                    </span>
                                )
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* =====================================================
                RESUME CONTENT
            ===================================================== */}

            <main className="modern-content">
                <TemplateContent
                    resume={resume}
                    variant="modern"
                />
            </main>
        </div>
    );
}