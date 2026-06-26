import { Link } from "react-router-dom";
import Logo from "./common/Logo";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted text-muted py-8 mt-auto">
            <div className="container mx-auto px-6">

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Brand Section */}
                    <div>
                        <div className="inline-flex items-center gap-3 mb-3">
                            <Logo className="h-10 w-10 text-xl" />
                            <h2 className="text-xl font-bold text-black dark:text-white">
                                Gultie Code
                            </h2>
                        </div>

                        <p className="text-sm">
                            Learn, Build, and Grow with Gultie Code.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                            Quick Links
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <Link to="/login" className="hover:text-primary dark:text-white transition">
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link to="/register" className="hover:text-primary dark:text-white transition">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                            Connect With Us
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary dark:text-white transition"
                                >
                                    GitHub
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary dark:text-white transition"
                                >
                                    LinkedIn
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary dark:text-white transition"
                                >
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-app mt-8 pt-4 text-center text-sm">
                    <p>
                        Contact:
                        {" "}
                        <a
                            href="mailto:siva.anubothula@gmail.com"
                            className="hover:text-white dark:text-white"
                        >
                            siva.anubothula@gmail.com
                        </a>
                    </p>

                    <p className="mt-2">
                        &copy; {currentYear} Gultie Code. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;