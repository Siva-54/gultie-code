import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import BlogsPage from "../pages/BlogsPage";
import Learning from "../pages/Learning";
import AdminPage from "../pages/AdminPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import LearningDomainPage from "../pages/LearningDomainPage";
import Profile from "../pages/Profile"
import LearningPlanPage from "../pages/LearningPlanPage";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {

    return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/blogs" element={<ProtectedRoute><BlogsPage /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path="/blogs/:id" element={<ProtectedRoute><BlogDetailsPage /></ProtectedRoute>} />
        <Route path="/learning/:id" element={<LearningDomainPage />} />
        <Route path="/learning-plans/:id" element={<LearningPlanPage />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
);

};

export default AppRoutes;