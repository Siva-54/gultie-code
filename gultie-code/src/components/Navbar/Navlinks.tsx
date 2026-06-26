import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface NavItem {
    name: string;
    path: string;
    roles: string[];
}

const Navlinks = () => {

    const { user } = useAuth();

    const links: NavItem[] = [
        {
            name: "Dashboard",
            path: "/dashboard",
            roles: ["user", "admin"]
        },
        {
            name: "Learning",
            path: "/learning",
            roles: ["user", "admin"]
        },
        {
            name: "Blogs",
            path: "/blogs",
            roles: ["user", "admin"]
        },
        // {
        //     name: "Leaderboard",
        //     path: "/leaderboard",
        //     roles: ["user", "admin"]
        // },
        {
            name: "Admin Panel",
            path: "/admin",
            roles: ["admin"]
        }
    ];

    const location = useLocation();
    const currentPath = location.pathname;

    const visibleLinks = links.filter(
        (link) =>
            user &&
            link.roles.includes(user.role)
    );

    return (
        <ul className="flex items-center gap-6">
            {visibleLinks.map((link) => (
                <li key={link.path}>
                    <Link
                        to={link.path}
                        className={`hover:text-primary transition ${
                            currentPath === link.path
                                ? "text-primary"
                                : ""
                        }`}
                    >
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Navlinks;