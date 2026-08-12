import TemplateContent from "./TemplateContent";

export default function ModernPhotoTemplate({
    resume,
}) {
    const { personalInfo } = resume;

    return (
        <div className="resume-template template-modern-photo">
            <header className="modern-photo-header">
                <div>
                    <h1>
                        {personalInfo.fullName ||
                            "Your Name"}
                    </h1>

                    <h2>
                        {personalInfo.jobTitle ||
                            "Professional Title"}
                    </h2>

                    <p>
                        {[
                            personalInfo.email,
                            personalInfo.phone,
                            personalInfo.location,
                        ]
                            .filter(Boolean)
                            .join(" • ")}
                    </p>
                </div>

                {personalInfo.photo ? (
                    <img
                        src={personalInfo.photo}
                        alt="Profile"
                        className="template-photo template-photo--round"
                    />
                ) : (
                    <div className="template-photo-placeholder template-photo--round">
                        Photo
                    </div>
                )}
            </header>

            <TemplateContent resume={resume} />
        </div>
    );
}