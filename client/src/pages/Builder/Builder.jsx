import ResumeEditor from "../../components/ResumeEditor/ResumeEditor";
import ResumePreview from "../../components/ResumePreview/ResumePreview";
import "./Builder.css";

export default function Builder() {
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

          <ResumePreview />
        </div>
      </div>
    </main>
  );
}