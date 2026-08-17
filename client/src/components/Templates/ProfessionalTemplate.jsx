import {
    Mail,
    Phone,
    MapPin,
    Globe,
} from "lucide-react";

import TemplateContent from "./TemplateContent";

export default function ProfessionalTemplate({ resume }) {
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
            icon: Globe,
        },
        {
            value: personalInfo.github,
            icon: Globe,
        },
    ].filter((item) => item.value);

    return (
        <div className="resume-template template-professional">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="professional-header">
                <div className="professional-header__top">
                    <div className="professional-header__identity">
                        <span className="professional-header__label">
                            PROFESSIONAL PROFILE
                        </span>

                        <h1>{fullName}</h1>

                        <h2>{jobTitle}</h2>
                    </div>

                    <div className="professional-header__initial">
                        {fullName
                            .charAt(0)
                            .toUpperCase()}
                    </div>
                </div>

                {contactItems.length > 0 && (
                    <div className="professional-contact">
                        {contactItems.map(
                            (
                                {
                                    value,
                                    icon: Icon,
                                },
                                index
                            ) => (
                                <span
                                    className="professional-contact__item"
                                    key={`${value}-${index}`}
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
            </header>

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <main className="professional-content">
                <TemplateContent
                    resume={resume}
                    variant="professional"
                />
            </main>
        </div>
    );
}