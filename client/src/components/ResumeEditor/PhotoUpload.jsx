import { Upload, Trash2 } from "lucide-react";

import { useResume } from "../../context/ResumeContext";

export default function PhotoUpload() {
    const {
        resume,
        setPhoto,
        removePhoto,
    } = useResume();

    const photoTemplates = [
        "creative",
        "modern-photo",
    ];

    const isPhotoTemplate =
        photoTemplates.includes(resume.template);

    if (!isPhotoTemplate) {
        return null;
    }

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
            alert(
                "Please choose an image smaller than 2MB."
            );
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setPhoto(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <section className="photo-upload-section">
            <div className="photo-upload-section__header">
                <div>
                    <h3>Profile Photo</h3>

                    <p>
                        Add a professional photo for this
                        template.
                    </p>
                </div>
            </div>

            {resume.personalInfo.photo && (
                <img
                    src={resume.personalInfo.photo}
                    alt="Profile preview"
                    className="photo-upload__preview"
                />
            )}

            <div className="photo-upload__actions">
                <label className="photo-upload__button">
                    <Upload size={16} />

                    {resume.personalInfo.photo
                        ? "Change Photo"
                        : "Upload Photo"}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        hidden
                    />
                </label>

                {resume.personalInfo.photo && (
                    <button
                        type="button"
                        className="photo-upload__remove"
                        onClick={removePhoto}
                    >
                        <Trash2 size={15} />
                        Remove
                    </button>
                )}
            </div>
        </section>
    );
}
