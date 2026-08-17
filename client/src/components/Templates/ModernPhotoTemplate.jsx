import TemplateContent from "./TemplateContent";

export default function ModernPhotoTemplate({ resume }) {
    const personalInfo = resume?.personalInfo || {};

    const photo = personalInfo.photo || "";

    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin,
        personalInfo.github,
        personalInfo.portfolio,
    ].filter(Boolean);

    return (
        <div
            className={`resume-template modern-photo-template ${
                photo
                    ? "modern-photo-template--has-photo"
                    : "modern-photo-template--no-photo"
            }`}
        >
            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="modern-photo-template__header">
                <div className="modern-photo-template__identity">
                    <span className="modern-photo-template__eyebrow">
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

                    <div className="modern-photo-template__accent" />
                </div>

                {/* =================================================
                    PHOTO
                ================================================= */}

                {photo && (
                    <div className="modern-photo-template__photo">
                        <img
                            src={photo}
                            alt={
                                personalInfo.fullName ||
                                "Profile"
                            }
                        />
                    </div>
                )}
            </header>

            {/* =====================================================
                CONTACT INFORMATION
            ===================================================== */}

            {contactItems.length > 0 && (
                <div className="modern-photo-template__contact">
                    {contactItems.map((item, index) => (
                        <span key={`${item}-${index}`}>
                            {item}
                        </span>
                    ))}
                </div>
            )}

            {/* =====================================================
                RESUME CONTENT
            ===================================================== */}

            <main className="modern-photo-template__content">
                <TemplateContent
                    resume={resume}
                    variant="modern-photo"
                />
            </main>
        </div>
    );
}
