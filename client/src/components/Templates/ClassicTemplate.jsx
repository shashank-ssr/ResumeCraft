import TemplateContent from "./TemplateContent";

export default function ClassicTemplate({ resume }) {
    const { personalInfo = {} } = resume;

    const contactDetails = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
        personalInfo.linkedin,
        personalInfo.github,
        personalInfo.portfolio,
    ].filter(Boolean);

    return (
        <div className="resume-template template-classic">
            {/* =====================================================
                HEADER
            ===================================================== */}
            <header className="classic-header">
                <h1>
                    {personalInfo.fullName || "Your Name"}
                </h1>

                {personalInfo.jobTitle && (
                    <h2>{personalInfo.jobTitle}</h2>
                )}

                {contactDetails.length > 0 && (
                    <div className="classic-contact">
                        {contactDetails.map((detail, index) => (
                            <span key={`${detail}-${index}`}>
                                {detail}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* =====================================================
                RESUME CONTENT
            ===================================================== */}
            <main className="classic-content">
                <TemplateContent
                    resume={resume}
                    variant="classic"
                />
            </main>
        </div>
    );
}