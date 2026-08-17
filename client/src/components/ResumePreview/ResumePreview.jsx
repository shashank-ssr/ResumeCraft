import {
    forwardRef,
    useEffect,
    useRef,
} from "react";

import { useResume } from "../../context/ResumeContext";

import ModernTemplate from "../Templates/ModernTemplate";
import ModernPhotoTemplate from "../Templates/ModernPhotoTemplate";
import ClassicTemplate from "../Templates/ClassicTemplate";
import MinimalTemplate from "../Templates/MinimalTemplate";
import ProfessionalTemplate from "../Templates/ProfessionalTemplate";
import CreativePhotoTemplate from "../Templates/CreativePhotoTemplate";
import ExecutiveTemplate from "../Templates/ExecutiveTemplate";

import "./ResumePreview.css";
import "../Templates/Templates.css";

const templates = {
    modern: ModernTemplate,
    "modern-photo": ModernPhotoTemplate,

    classic: ClassicTemplate,

    minimal: MinimalTemplate,

    professional: ProfessionalTemplate,

    creative: CreativePhotoTemplate,
    executive: ExecutiveTemplate,
};

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const ResumePreview = forwardRef(function ResumePreview(
    { fitHeight = false } = {},
    ref
) {
    const { resume } = useResume();

    const wrapperRef = useRef(null);

    const selectedTemplate =
        resume.template === "creative-photo"
            ? "creative"
            : resume.template || "modern";

    const TemplateComponent =
        templates[selectedTemplate] ||
        ModernTemplate;

    useEffect(() => {
        const wrapper = wrapperRef.current;

        if (!wrapper) {
            return;
        }

        const updateScale = () => {
            const availableWidth =
                wrapper.clientWidth;

            if (!availableWidth) {
                return;
            }

            const heightScale =
                fitHeight && wrapper.clientHeight
                    ? wrapper.clientHeight / A4_HEIGHT
                    : 1;

            const scale = Math.min(
                1,
                availableWidth / A4_WIDTH,
                heightScale
            );

            wrapper.style.setProperty(
                "--preview-scale",
                scale
            );

            wrapper.style.setProperty(
                "--preview-height",
                `${A4_HEIGHT * scale}px`
            );

            if (!fitHeight) {
                wrapper.style.height =
                    `${A4_HEIGHT * scale}px`;
            } else {
                wrapper.style.removeProperty(
                    "height"
                );
            }
        };

        updateScale();

        const resizeObserver =
            new ResizeObserver(updateScale);

        resizeObserver.observe(wrapper);

        window.addEventListener(
            "resize",
            updateScale
        );

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener(
                "resize",
                updateScale
            );
        };
    }, [fitHeight]);

    return (
        <div
            ref={wrapperRef}
            className={`resume-preview-wrapper ${
                fitHeight
                    ? "resume-preview-wrapper--fit-height"
                    : ""
            }`}
        >
            <div
                ref={ref}
                id="resume-preview"
                className={`resume-preview resume-preview--${selectedTemplate}`}
                data-template={selectedTemplate}
            >
                <TemplateComponent
                    resume={resume}
                />
            </div>
        </div>
    );
});

export default ResumePreview;
