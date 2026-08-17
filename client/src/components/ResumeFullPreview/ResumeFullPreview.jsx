import { useEffect } from "react";

import ResumePreview from "../ResumePreview/ResumePreview";

import "./ResumeFullPreview.css";

export default function ResumeFullPreview({
    onClose,
    onDownload,
    previewRef,
}) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div
            className="resume-full-preview"
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
        >
            <div
                className="resume-full-preview__backdrop"
                onClick={onClose}
            />

            <div className="resume-full-preview__modal">
                <header className="resume-full-preview__header">
                    <div>
                        <span>
                            RESUME PREVIEW
                        </span>

                        <h2>
                            Review your resume
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="resume-full-preview__close"
                        onClick={onClose}
                        aria-label="Close preview"
                    >
                        ×
                    </button>
                </header>

                <main className="resume-full-preview__body">
                    <div className="resume-full-preview__page">
                        <ResumePreview
                            ref={previewRef}
                        />
                    </div>
                </main>

                <footer className="resume-full-preview__footer">
                    <button
                        type="button"
                        className="resume-full-preview__secondary"
                        onClick={onClose}
                    >
                        Back to Builder
                    </button>

                    <button
                        type="button"
                        className="resume-full-preview__primary"
                        onClick={onDownload}
                    >
                        Download PDF
                    </button>
                </footer>
            </div>
        </div>
    );
}