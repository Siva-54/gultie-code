import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";

const UserActions = () => {
    const {theme, toggleTheme} = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex items-center gap-4">
            <Button text={theme === "light" ? "🌙" : "☀️"} variant="secondary" onClick={toggleTheme} className="bg-surface hover:bg-yellow-100" />
            <Link
                to="/profile"
                className="hover:text-primary transition"
            >
                Profile
            </Link>

            <Button
                text="Logout"
                variant="danger"
                onClick={handleLogout}
            />
        </div>
    );
};

export default UserActions;