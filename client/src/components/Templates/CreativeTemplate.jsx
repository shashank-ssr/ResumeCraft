export default function CreativeTemplate({ resume }) {
    return (
        <div className="template template--creative">
            {resume.personalInfo?.photo && (
                <img
                    src={resume.personalInfo.photo}
                    alt="Profile"
                    className="template-photo"
                />
            )}

            <h1>
                {resume.personalInfo?.fullName ||
                    "Your Name"}
            </h1>

            <h2>
                {resume.personalInfo?.jobTitle ||
                    "Professional Title"}
            </h2>

            <p>
                Creative Resume Template
            </p>
        </div>
    );
}