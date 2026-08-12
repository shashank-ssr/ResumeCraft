export default function ProfessionalTemplate({ resume }) {
    return (
        <div className="template template--professional">
            <h1>
                {resume.personalInfo?.fullName ||
                    "Your Name"}
            </h1>

            <h2>
                {resume.personalInfo?.jobTitle ||
                    "Professional Title"}
            </h2>

            <p>
                Professional Resume Template
            </p>
        </div>
    );
}