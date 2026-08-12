import { Plus, Trash2 } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import "./Certifications.css";

const createCertification = () => ({
    id: crypto.randomUUID(),
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    link: "",
    description: "",
});

export default function Certifications() {
    const { resume, updateResume } = useResume();

    const certifications = resume.certifications || [];

    const addCertification = () => {
        updateResume("certifications", [
            ...certifications,
            createCertification(),
        ]);
    };

    const removeCertification = (id) => {
        updateResume(
            "certifications",
            certifications.filter(
                (certification) =>
                    certification.id !== id
            )
        );
    };

    const updateCertification = (
        id,
        field,
        value
    ) => {
        updateResume(
            "certifications",
            certifications.map((certification) =>
                certification.id === id
                    ? {
                          ...certification,
                          [field]: value,
                      }
                    : certification
            )
        );
    };

    return (
        <section className="certifications-section">
            <div className="section-header section-header--row">
                <div>
                    <h2>Certifications</h2>

                    <p>
                        Add professional certifications,
                        courses, and credentials.
                    </p>
                </div>

                <button
                    type="button"
                    className="add-section-button"
                    onClick={addCertification}
                >
                    <Plus size={17} />
                    Add Certification
                </button>
            </div>

            {certifications.length === 0 && (
                <div className="empty-section">
                    <div className="empty-section__icon">
                        <Plus size={20} />
                    </div>

                    <h3>
                        No certifications added yet
                    </h3>

                    <p>
                        Add certifications and courses
                        that strengthen your resume.
                    </p>

                    <button
                        type="button"
                        className="empty-section__button"
                        onClick={addCertification}
                    >
                        Add your first certification
                    </button>
                </div>
            )}

            <div className="certifications-list">
                {certifications.map(
                    (certification, index) => (
                        <div
                            className="certification-card"
                            key={certification.id}
                        >
                            <div className="certification-card__header">
                                <span className="certification-card__number">
                                    Certification{" "}
                                    {index + 1}
                                </span>

                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() =>
                                        removeCertification(
                                            certification.id
                                        )
                                    }
                                    aria-label="Delete certification"
                                >
                                    <Trash2 size={17} />
                                </button>
                            </div>

                            <div className="form-grid">
                                <div className="form-field">
                                    <label>
                                        Certification Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. AWS Certified Cloud Practitioner"
                                        value={
                                            certification.name
                                        }
                                        onChange={(event) =>
                                            updateCertification(
                                                certification.id,
                                                "name",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field">
                                    <label>
                                        Issuing Organization
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Amazon Web Services"
                                        value={
                                            certification.issuer
                                        }
                                        onChange={(event) =>
                                            updateCertification(
                                                certification.id,
                                                "issuer",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field">
                                    <label>
                                        Issue Date
                                    </label>

                                    <input
                                        type="month"
                                        value={
                                            certification.issueDate
                                        }
                                        onChange={(event) =>
                                            updateCertification(
                                                certification.id,
                                                "issueDate",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field">
                                    <label>
                                        Expiry Date
                                    </label>

                                    <input
                                        type="month"
                                        value={
                                            certification.expiryDate
                                        }
                                        onChange={(event) =>
                                            updateCertification(
                                                certification.id,
                                                "expiryDate",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field">
                                    <label>
                                        Credential ID
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. ABC123XYZ"
                                        value={
                                            certification.credentialId
                                        }
                                        onChange={(event) =>
                                            updateCertification(
                                                certification.id,
                                                "credentialId",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field">
                                    <label>
                                        Credential Link
                                    </label>

                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={
                                            certification.link
                                        }
                                        onChange={(event) =>
                                            updateCertification(
                                                certification.id,
                                                "link",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="form-field form-field--full">
                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        placeholder="Briefly describe the certification or skills covered..."
                                        value={
                                            certification.description
                                        }
                                        onChange={(event) =>
                                            updateCertification(
                                                certification.id,
                                                "description",
                                                event.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}