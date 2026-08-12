import {
    Mail,
    Phone,
    MapPin,
    Globe,
} from "lucide-react";

import TemplateContent from "./TemplateContent";

export default function ModernTemplate({
    resume,
}) {
    const { personalInfo } = resume;

    return (
        <div className="resume-template template-modern">
            <header className="modern-header">
                <h1>
                    {personalInfo.fullName ||
                        "Your Name"}
                </h1>

                <h2>
                    {personalInfo.jobTitle ||
                        "Professional Title"}
                </h2>

                <div className="modern-contact">
                    {personalInfo.email && (
                        <span>
                            <Mail size={10} />
                            {personalInfo.email}
                        </span>
                    )}

                    {personalInfo.phone && (
                        <span>
                            <Phone size={10} />
                            {personalInfo.phone}
                        </span>
                    )}

                    {personalInfo.location && (
                        <span>
                            <MapPin size={10} />
                            {personalInfo.location}
                        </span>
                    )}

                    {personalInfo.portfolio && (
                        <span>
                            <Globe size={10} />
                            {personalInfo.portfolio}
                        </span>
                    )}
                </div>
            </header>

            <TemplateContent resume={resume} />
        </div>
    );
}