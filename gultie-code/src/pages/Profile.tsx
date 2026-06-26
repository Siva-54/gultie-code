import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { getProfileStats } from "../services/profileService";

const Profile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const data = await getProfileStats();
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-app text-black dark:text-white">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8">Profile</h1>

                {/* Profile Card */}
                <div className="bg-surface rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">User Information</h2>
                    <div className="space-y-3">
                        <p><strong>Username:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Role:</strong> {user?.role}</p>
                        <p><strong>Status:</strong> {user?.status}</p>
                        <p><strong>Email Verified:</strong> {user?.email_verified ? "Yes" : "No"}</p>
                        <p><strong>Joined:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</p>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold">Blogs Created</h3>
                        <p className="text-4xl font-bold mt-3">{stats?.blogs_count || 0}</p>
                    </div>
                    <div className="bg-surface rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold">Comments Added</h3>
                        <p className="text-4xl font-bold mt-3">{stats?.comments_count || 0}</p>
                    </div>
                </div>

                {/* Future AI Planner Section */}
                <div className="bg-surface rounded-lg shadow p-6 mt-8">
                    <h2 className="text-xl font-bold mb-4">Learning Journey</h2>
                    <p className="text-muted">Your AI-generated learning plans and progress will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
