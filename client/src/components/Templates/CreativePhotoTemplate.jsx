import TemplateContent from "./TemplateContent";

export default function CreativePhotoTemplate({
    resume,
}) {
    const { personalInfo } = resume;

    return (
        <div className="resume-template template-creative-photo">
            <aside className="creative-sidebar">
                {personalInfo.photo ? (
                    <img
                        src={personalInfo.photo}
                        alt="Profile"
                        className="template-photo"
                    />
                ) : (
                    <div className="template-photo-placeholder">
                        Photo
                    </div>
                )}

                <h1>
                    {personalInfo.fullName ||
                        "Your Name"}
                </h1>

                <h2>
                    {personalInfo.jobTitle ||
                        "Professional Title"}
                </h2>

                <div className="creative-contact">
                    {personalInfo.email}
                    {personalInfo.phone}
                    {personalInfo.location}
                    {personalInfo.linkedin}
                    {personalInfo.github}
                </div>
            </aside>

            <main className="creative-main">
                <TemplateContent resume={resume} />
            </main>
        </div>
    );
}