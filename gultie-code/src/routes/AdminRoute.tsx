import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const AdminRoute = ({
    children
}: Props) => {

    const {
        user,
        loading
    } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (user.role !== "admin") {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return <>{children}</>;
};

export default AdminRoute;