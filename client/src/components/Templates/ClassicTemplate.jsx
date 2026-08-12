import TemplateContent from "./TemplateContent";

export default function ClassicTemplate({
    resume,
}) {
    const { personalInfo } = resume;

    return (
        <div className="resume-template template-classic">
            <header className="classic-header">
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
            </header>

            <TemplateContent resume={resume} />
        </div>
    );
}