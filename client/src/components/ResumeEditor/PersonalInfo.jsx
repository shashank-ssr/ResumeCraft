import { useResume } from "../../context/ResumeContext";
import "./PersonalInfo.css";

export default function PersonalInfo() {
  const { resume, updatePersonalInfo } = useResume();

  const { personalInfo } = resume;

  const handleChange = (event) => {
    const { name, value } = event.target;

    updatePersonalInfo(name, value);
  };

  return (
    <section className="personal-info">
      <div className="section-header">
        <div>
          <h2>Personal Information</h2>
          <p>
            Add your basic contact information so recruiters can reach you.
          </p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field form-field--full">
          <label htmlFor="fullName">Full Name</label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="e.g. Shashank Singh"
            value={personalInfo.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="jobTitle">Professional Title</label>

          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            placeholder="e.g. Full Stack Developer"
            value={personalInfo.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={personalInfo.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={personalInfo.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>

          <input
            id="location"
            name="location"
            type="text"
            placeholder="Jaipur, Rajasthan"
            value={personalInfo.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="linkedin">LinkedIn</label>

          <input
            id="linkedin"
            name="linkedin"
            type="text"
            placeholder="linkedin.com/in/yourname"
            value={personalInfo.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="github">GitHub</label>

          <input
            id="github"
            name="github"
            type="text"
            placeholder="github.com/yourusername"
            value={personalInfo.github}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="portfolio">Portfolio</label>

          <input
            id="portfolio"
            name="portfolio"
            type="text"
            placeholder="yourportfolio.com"
            value={personalInfo.portfolio}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
}