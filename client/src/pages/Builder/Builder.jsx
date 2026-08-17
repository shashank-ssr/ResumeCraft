import {
    useRef,
    useState,
} from "react";

import {
    Download,
    Eye,
    X,
} from "lucide-react";

import ResumeEditor from "../../components/ResumeEditor/ResumeEditor";
import ResumePreview from "../../components/ResumePreview/ResumePreview";

import { generateResumePDF } from "../../utils/generateResumePDF";

import "./Builder.css";

export default function Builder() {
    const previewRef =
        useRef(null);

    const [isDownloading, setIsDownloading] =
        useState(false);

    const [showPreview, setShowPreview] =
        useState(false);

    const handleDownload = async () => {
        if (
            isDownloading ||
            !previewRef.current
        ) {
            return;
        }

        try {
            setIsDownloading(true);

            await generateResumePDF(
                previewRef.current,
                "ResumeCraft-Resume.pdf"
            );
        } catch (error) {
            console.error(
                "Resume PDF generation failed:",
                error
            );

            alert(
                "Unable to generate the PDF. Please try again."
            );
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <main className="builder-page">
            <div className="builder-page__container">
                {/* =================================================
                    EDITOR
                ================================================= */}

                <div className="builder-page__editor">
                    <ResumeEditor />
                </div>

                {/* =================================================
                    LIVE PREVIEW
                ================================================= */}

                <div className="builder-page__preview">
                    <div className="preview-label">
                        Live Preview
                    </div>

                    <ResumePreview
                        ref={previewRef}
                    />
                </div>
            </div>

            {/* =================================================
                DOWNLOAD BAR
            ================================================= */}

            <div className="builder-download">
                <div className="builder-download__content">
                    <div>
                        <h2>
                            Your resume is ready
                        </h2>

                        <p>
                            Preview your completed
                            resume before downloading
                            the professional PDF.
                        </p>
                    </div>

                    <div className="builder-download__actions">
                        <button
                            type="button"
                            className="builder-preview__button"
                            onClick={() =>
                                setShowPreview(true)
                            }
                        >
                            <Eye size={17} />

                            Preview Resume
                        </button>

                        <button
                            type="button"
                            className="builder-download__button"
                            onClick={handleDownload}
                            disabled={
                                isDownloading
                            }
                        >
                            <Download size={17} />

                            {isDownloading
                                ? "Generating PDF..."
                                : "Download Resume"}
                        </button>
                    </div>
                </div>
            </div>

            {/* =================================================
                FULL RESUME PREVIEW MODAL
            ================================================= */}

            {showPreview && (
                <div
                    className="resume-preview-modal"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            setShowPreview(false);
                        }
                    }}
                >
                    <div className="resume-preview-modal__content">
                        <div className="resume-preview-modal__header">
                            <div>
                                <span>
                                    ResumeCraft
                                </span>

                                <h2>
                                    Resume Preview
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPreview(
                                        false
                                    )
                                }
                                aria-label="Close preview"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="resume-preview-modal__body">
                            <div className="resume-preview-modal__page">
                                <div
                                    ref={(element) => {
                                        /*
                                         * The modal preview is only visual.
                                         * The actual PDF still uses previewRef.
                                         */
                                    }}
                                    className="resume-preview-modal__resume"
                                >
                                    <ResumePreview />
                                </div>
                            </div>
                        </div>

                        <div className="resume-preview-modal__footer">
                            <button
                                type="button"
                                className="builder-preview__button"
                                onClick={() =>
                                    setShowPreview(
                                        false
                                    )
                                }
                            >
                                Back to Editor
                            </button>

                            <button
                                type="button"
                                className="builder-download__button"
                                onClick={async () => {
                                    setShowPreview(
                                        false
                                    );

                                    await handleDownload();
                                }}
                                disabled={
                                    isDownloading
                                }
                            >
                                <Download
                                    size={17}
                                />

                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}