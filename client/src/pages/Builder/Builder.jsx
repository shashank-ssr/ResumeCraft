import { useRef, useState } from "react";
import { Download } from "lucide-react";

import ResumeEditor from "../../components/ResumeEditor/ResumeEditor";
import ResumePreview from "../../components/ResumePreview/ResumePreview";

import { generateResumePDF } from "../../utils/generateResumePDF";

import "./Builder.css";

export default function Builder() {
    const previewRef = useRef(null);

    const [isDownloading, setIsDownloading] =
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
                <div className="builder-page__editor">
                    <ResumeEditor />
                </div>

                <div className="builder-page__preview">
                    <div className="preview-label">
                        Live Preview
                    </div>

                    <ResumePreview
                        ref={previewRef}
                    />
                </div>
            </div>

            <div className="builder-download">
                <div className="builder-download__content">
                    <div>
                        <h2>
                            Your resume is ready
                        </h2>

                        <p>
                            Download your completed
                            resume as a professional PDF.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="builder-download__button"
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        <Download size={17} />

                        {isDownloading
                            ? "Generating PDF..."
                            : "Download Resume"}
                    </button>
                </div>
            </div>
        </main>
    );
}