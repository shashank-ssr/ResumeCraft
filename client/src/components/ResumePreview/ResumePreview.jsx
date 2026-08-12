import { forwardRef } from "react";

import { useResume } from "../../context/ResumeContext";

import ModernTemplate from "../Templates/ModernTemplate";
import ClassicTemplate from "../Templates/ClassicTemplate";
import MinimalTemplate from "../Templates/MinimalTemplate";
import ProfessionalTemplate from "../Templates/ProfessionalTemplate";
import CreativeTemplate from "../Templates/CreativeTemplate";
import ExecutiveTemplate from "../Templates/ExecutiveTemplate";

import "./ResumePreview.css";
import "../Templates/Templates.css";

const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate,
    executive: ExecutiveTemplate,
};

const ResumePreview = forwardRef(
    function ResumePreview(_, ref) {
        const { resume } = useResume();

        const selectedTemplate =
            resume.template || "modern";

        const TemplateComponent =
            templates[selectedTemplate] ||
            ModernTemplate;

        return (
            <div className="resume-preview-wrapper">
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
    }
);

export default ResumePreview;