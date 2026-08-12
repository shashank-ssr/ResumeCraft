import {
    Camera,
    Upload,
    X,
} from "lucide-react";

import { useRef } from "react";

import { useResume } from "../../context/ResumeContext";

import "./PersonalInfo.css";

export default function PersonalInfo() {
    const {
        resume,
        updatePersonalInfo,
        updateResume,
    } = useResume();

    const fileInputRef = useRef(null);

    const { personalInfo } = resume;

    const handleChange = (event) => {
        const { name, value } = event.target;

        updatePersonalInfo(name, value);
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please choose an image smaller than 2MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            updateResume(
                "photo",
                reader.result
            );

            updateResume(
                "photoEnabled",
                true
            );
        };

        reader.readAsDataURL(file);

        event.target.value = "";
    };

    const removePhoto = () => {
        updateResume("photo", "");
    };

    return (
        <section className="personal-info">
            <div className="section-header">
                <div>
                    <h2>Personal Information</h2>

                    <p>
                        Add your basic contact information
                        so recruiters can reach you.
                    </p>
                </div>
            </div>

            <div className="personal-info__photo">
                <div className="personal-info__photo-preview">
                    {resume.photo ? (
                        <img
                            src={resume.photo}
                            alt="Profile"
                        />
                    ) : (
                        <Camera size={26} />
                    )}
                </div>

                <div className="personal-info__photo-content">
                    <strong>Profile Photo</strong>

                    <span>
                        Optional. Used by photo-based
                        resume templates.
                    </span>

                    <div className="personal-info__photo-actions">
                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                        >
                            <Upload size={14} />
                            {resume.photo
                                ? "Change Photo"
                                : "Upload Photo"}
                        </button>

                        {resume.photo && (
                            <button
                                type="button"
                                className="personal-info__remove-photo"
                                onClick={removePhoto}
                            >
                                <X size={14} />
                                Remove
                            </button>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        hidden
                        onChange={handlePhotoChange}
                    />
                </div>
            </div>

            <div className="form-grid">
                <div className="form-field form-field--full">
                    <label htmlFor="fullName">
                        Full Name
                    </label>

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
                    <label htmlFor="jobTitle">
                        Professional Title
                    </label>

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
                    <label htmlFor="email">
                        Email
                    </label>

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
                    <label htmlFor="phone">
                        Phone
                    </label>

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
                    <label htmlFor="location">
                        Location
                    </label>

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
                    <label htmlFor="linkedin">
                        LinkedIn
                    </label>

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
                    <label htmlFor="github">
                        GitHub
                    </label>

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
                    <label htmlFor="portfolio">
                        Portfolio
                    </label>

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