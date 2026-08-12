import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">

                <div className="footer__main">

                    <div className="footer__brand">
                        <Link
                            to="/"
                            className="footer__logo"
                        >
                            Resume<span>Craft</span>
                        </Link>

                        <p>
                            Build a professional resume easily
                            with AI-powered assistance.
                        </p>
                    </div>

                    <div className="footer__links">

                        <div className="footer__column">
                            <h3>Product</h3>

                            <Link to="/builder">
                                Create Resume
                            </Link>

                            <Link to="/templates">
                                Templates
                            </Link>
                        </div>

                        <div className="footer__column">
                            <h3>Resources</h3>

                            <Link to="/templates">
                                Resume Templates
                            </Link>

                            <Link to="/">
                                Resume Tips
                            </Link>
                        </div>

                    </div>

                </div>

                <div className="footer__bottom">

                    <p>
                        © {new Date().getFullYear()} ResumeCraft.
                        All rights reserved.
                    </p>

                    <span>
                        Build your future.
                    </span>

                </div>

            </div>
        </footer>
    );
}