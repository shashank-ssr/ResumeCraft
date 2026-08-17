import TemplateContent from "./TemplateContent";

export default function ExecutiveTemplate({ resume }) {
    const personalInfo = resume.personalInfo || {};

    const contactDetails = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin,
        personalInfo.github,
        personalInfo.portfolio,
    ].filter(Boolean);

    return (
        <div className="resume-template template-executive">
            {/* =================================================
                EXECUTIVE HEADER
            ================================================= */}
            <header className="executive-header">
                <div className="executive-header__identity">
                    <span className="executive-label">
                        PROFESSIONAL RESUME
                    </span>

                    <h1>
                        {personalInfo.fullName ||
                            "Your Name"}
                    </h1>

                    <h2>
                        {personalInfo.jobTitle ||
                            "Professional Title"}
                    </h2>
                </div>

                {/* Optional Profile Photo */}
                {personalInfo.photo && (
                    <div className="executive-header__photo">
                        <img
                            src={personalInfo.photo}
                            alt={
                                personalInfo.fullName ||
                                "Profile"
                            }
                        />
                    </div>
                )}

                {/* Contact */}
                {contactDetails.length > 0 && (
                    <div className="executive-contact">
                        <span className="executive-contact__title">
                            CONTACT
                        </span>

                        {contactDetails.map(
                            (detail, index) => (
                                <span
                                    className="executive-contact__item"
                                    key={`${detail}-${index}`}
                                >
                                    {detail}
                                </span>
                            )
                        )}
                    </div>
                )}
            </header>

            {/* =================================================
                ACCENT LINE
            ================================================= */}
            <div className="executive-accent">
                <span />
                <span />
            </div>

            {/* =================================================
                CONTENT
            ================================================= */}
            <main className="executive-content">
                <TemplateContent
                    resume={resume}
                    variant="executive"
                />
            </main>

            {/* =================================================
                FOOTER
            ================================================= */}
            <footer className="executive-footer">
                <span>
                    {personalInfo.fullName ||
                        "Your Name"}
                </span>

                <span>
                    PROFESSIONAL RESUME
                </span>
            </footer>
        </div>
    );
}