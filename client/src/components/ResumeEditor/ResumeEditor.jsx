import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";
import Summary from "./Summary";
import Certifications from "./Certifications";
import Achievements from "./Achievements";
import Languages from "./Languages";

import SectionManager from "../SectionManager/SectionManager";

import { useResume } from "../../context/ResumeContext";

import "./ResumeEditor.css";

export default function ResumeEditor() {
    const { resume } = useResume();

    const enabledSections =
        resume.enabledSections || [];

    return (
        <div className="resume-editor">
            <div className="resume-editor__header">
                <div>
                    <span className="resume-editor__eyebrow">
                        Resume Builder
                    </span>

                    <h1>Build your resume</h1>

                    <p>
                        Start with your personal
                        information. Add or remove sections
                        to create a resume that fits your
                        experience.
                    </p>
                </div>
            </div>

            <div className="resume-editor__sections">
                <PersonalInfo />

                {enabledSections.includes("summary") && (
                    <Summary />
                )}

                {enabledSections.includes("experience") && (
                    <Experience />
                )}

                {enabledSections.includes("education") && (
                    <Education />
                )}

                {enabledSections.includes("projects") && (
                    <Projects />
                )}

                {enabledSections.includes("skills") && (
                    <Skills />
                )}

                {enabledSections.includes("certifications") && (
                    <Certifications />
                )}

                {enabledSections.includes("achievements") && (
                    <Achievements />
                )}

                {enabledSections.includes("languages") && (
                    <Languages />
                )}

                <SectionManager />
            </div>
        </div>
    );
}