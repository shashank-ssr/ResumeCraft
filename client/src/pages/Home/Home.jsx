import { Link } from "react-router-dom";
import { Sparkles, FileText, Download, Zap } from "lucide-react";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content">
          <div className="hero__badge">
            <Sparkles size={16} />
            AI-powered resume builder
          </div>

          <h1>
            Build a resume that
            <span> gets you noticed.</span>
          </h1>

          <p>
            Create a professional resume in minutes with AI-powered writing
            assistance. No account. No complicated setup. Just build and
            download.
          </p>

          <div className="hero__actions">
            <Link to="/builder" className="hero__primary">
              Create My Resume
            </Link>

            <Link to="/templates" className="hero__secondary">
              Explore Templates
            </Link>
          </div>

          <div className="hero__features">
            <div>
              <FileText size={18} />
              <span>Professional templates</span>
            </div>

            <div>
              <Sparkles size={18} />
              <span>AI writing assistance</span>
            </div>

            <div>
              <Download size={18} />
              <span>Download as PDF</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="resume-card">
            <div className="resume-card__top">
              <div>
                <div className="skeleton skeleton--name" />
                <div className="skeleton skeleton--subtitle" />
              </div>

              <div className="resume-card__avatar" />
            </div>

            <div className="resume-card__section">
              <div className="skeleton skeleton--heading" />
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton skeleton--short" />
            </div>

            <div className="resume-card__section">
              <div className="skeleton skeleton--heading" />
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton skeleton--short" />
            </div>

            <div className="resume-card__section">
              <div className="skeleton skeleton--heading" />

              <div className="resume-card__skills">
                <span>React</span>
                <span>JavaScript</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
            </div>

            <div className="resume-card__ai">
              <Sparkles size={17} />
              <span>AI-powered content suggestions</span>
              <Zap size={16} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}