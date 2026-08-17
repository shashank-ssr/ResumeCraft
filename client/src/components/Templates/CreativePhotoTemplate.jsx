import TemplateContent from "./TemplateContent";

export default function CreativePhotoTemplate({ resume }) {
    const personalInfo = resume.personalInfo || {};

    const photo = personalInfo.photo || "";

    const contactDetails = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
    ].filter(Boolean);

    return (
        <div className="resume-template creative-photo-template">
            {/* =====================================================
                LEFT SIDEBAR
            ===================================================== */}
            <aside className="creative-photo-template__sidebar">
                {/* Profile Photo */}
                <div className="creative-photo-template__photo-wrapper">
                    <div className="creative-photo-template__photo">
                        {photo ? (
                            <img
                                src={photo}
                                alt={
                                    personalInfo.fullName ||
                                    "Profile"
                                }
                            />
                        ) : (
                            <div className="creative-photo-template__photo-placeholder">
                                <span>Photo</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Name */}
                <div className="creative-photo-template__identity">
                    <h1>
                        {personalInfo.fullName ||
                            "Your Name"}
                    </h1>

                    <h2>
                        {personalInfo.jobTitle ||
                            "Professional Title"}
                    </h2>
                </div>

                {/* Accent Divider */}
                <div className="creative-photo-template__divider" />

                {/* Contact */}
                {contactDetails.length > 0 && (
                    <div className="creative-photo-template__contact">
                        <h3>Contact</h3>

                        {contactDetails.map(
                            (detail, index) => (
                                <div
                                    className="creative-photo-template__contact-item"
                                    key={`${detail}-${index}`}
                                >
                                    {detail}
                                </div>
                            )
                        )}
                    </div>
                )}

                {/* Links */}
                {(personalInfo.linkedin ||
                    personalInfo.github ||
                    personalInfo.portfolio) && (
                    <div className="creative-photo-template__links">
                        <h3>Links</h3>

                        {personalInfo.linkedin && (
                            <div className="creative-photo-template__link">
                                {personalInfo.linkedin}
                            </div>
                        )}

                        {personalInfo.github && (
                            <div className="creative-photo-template__link">
                                {personalInfo.github}
                            </div>
                        )}

                        {personalInfo.portfolio && (
                            <div className="creative-photo-template__link">
                                {personalInfo.portfolio}
                            </div>
                        )}
                    </div>
                )}
            </aside>

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}
            <main className="creative-photo-template__content">
                <TemplateContent
                    resume={resume}
                    variant="creative-photo"
                />
            </main>
        </div>
    );
}