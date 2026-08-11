import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";
import Summary from "./Summary";
import "./ResumeEditor.css";

export default function ResumeEditor() {
    return (
        <div className="resume-editor">
            <div className="resume-editor__header">
                <div>
                    <span className="resume-editor__eyebrow">Resume Builder</span>

                    <h1>Build your resume</h1>

                    <p>
                        Start with your personal information. You can add the remaining
                        sections as you build your resume.
                    </p>
                </div>
            </div>

            <div className="resume-editor__sections">
                <PersonalInfo />
                <Summary />
                <Experience />
                <Education />
                <Projects />
                <Skills />
            </div>
        </div>
    );
}