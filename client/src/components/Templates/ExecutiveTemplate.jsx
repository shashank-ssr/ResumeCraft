import TemplateContent from "./TemplateContent";

export default function ExecutiveTemplate({
    resume,
}) {
    const { personalInfo } = resume;

    return (
        <div className="resume-template template-executive">
            <header>
                <div>
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

                <div className="executive-contact">
                    {personalInfo.email}
                    <br />
                    {personalInfo.phone}
                    <br />
                    {personalInfo.location}
                </div>
            </header>

            <TemplateContent resume={resume} />
        </div>
    );
}