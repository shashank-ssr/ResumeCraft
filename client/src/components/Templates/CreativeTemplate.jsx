import TemplateContent from "./TemplateContent";

export default function CreativeTemplate({ resume }) {
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
        <div className="resume-template creative-template">
            {/* =================================================
                HEADER
            ================================================= */}
            <header className="creative-template__header">
                <div className="creative-template__header-main">
                    <div className="creative-template__eyebrow">
                        RESUME
                    </div>

                    <h1>
                        {personalInfo.fullName ||
                            "Your Name"}
                    </h1>

                    <h2>
                        {personalInfo.jobTitle ||
                            "Professional Title"}
                    </h2>
                </div>

                {/* Photo */}
                {personalInfo.photo && (
                    <div className="creative-template__photo-wrapper">
                        <img
                            src={personalInfo.photo}
                            alt={
                                personalInfo.fullName ||
                                "Profile"
                            }
                            className="creative-template__photo"
                        />
                    </div>
                )}
            </header>

            {/* =================================================
                ACCENT BAR
            ================================================= */}
            <div className="creative-template__accent">
                <span />
                <span />
                <span />
            </div>

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}
            {contactDetails.length > 0 && (
                <div className="creative-template__contact">
                    {contactDetails.map(
                        (detail, index) => (
                            <span
                                key={`${detail}-${index}`}
                            >
                                {detail}
                            </span>
                        )
                    )}
                </div>
            )}

            {/* =================================================
                RESUME CONTENT
            ================================================= */}
            <main className="creative-template__content">
                <TemplateContent
                    resume={resume}
                    variant="creative"
                />
            </main>
        </div>
    );
}