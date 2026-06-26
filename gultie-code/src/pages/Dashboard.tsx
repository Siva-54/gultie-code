import Navbar from "../components/Navbar/Navbar";
import DomainCard from "../components/DomainCard";
import BlogCard from "../components/BlogCard";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBlogs } from "../services/blogService";
import { getDomains } from "../services/learningService";

import { useAuth } from "../contexts/AuthContext";

import type { Blog } from "../types/blog";
import type { Domain } from "../types/domain";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [domains, setDomains] = useState<Domain[]>([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);
    const [loadingDomains, setLoadingDomains] = useState(true);

    const fetchLatestBlogs = async () => {
        try {
            setLoadingBlogs(true);
            const data = await getBlogs();
            const sortedBlogs = [...data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setBlogs(sortedBlogs.slice(0, 2));
        } catch (error) {
            console.error("Failed to load blogs", error);
        } finally {
            setLoadingBlogs(false);
        }
    };

    const fetchDomains = async () => {
        try {
            setLoadingDomains(true);
            const data = await getDomains();
            setDomains(data.slice(0, 3));
        } catch (error) {
            console.error("Failed to load domains", error);
        } finally {
            setLoadingDomains(false);
        }
    };

    useEffect(() => {
        fetchLatestBlogs();
        fetchDomains();
    }, []);


return (
    <div className="min-h-screen bg-app text-black dark:text-white">
        <Navbar />

        {/* Welcome + Domains */}
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Welcome {user?.username} 👋</h1>
                <button onClick={() => navigate("/learning")} className="text-primary hover:underline font-medium">View All Domains →</button>
            </div>

            <h2 className="text-xl font-semibold mb-4">Learning Domains</h2>

            {loadingDomains ? (
                <div>Loading domains...</div>
            ) : domains.length === 0 ? (
                <div className="text-muted">No domains available.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domains.map((domain) => (
                        <DomainCard key={domain.id} id={domain.id} domainName={domain.name} description={domain.description} minimumDurationWeeks={domain.minimum_duration_weeks} />
                    ))}
                </div>
            )}
        </div>

        {/* Blogs */}
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Latest Blogs</h2>
                <button onClick={() => navigate("/blogs")} className="text-primary hover:underline font-medium">View All Blogs →</button>
            </div>

            {loadingBlogs ? (
                <div>Loading blogs...</div>
            ) : blogs.length === 0 ? (
                <div className="text-muted">No blogs available.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} id={blog.id} title={blog.title} author={blog.author_username} authorId={blog.author_id} date={blog.created_at} content={blog.content} currentUser={user} showActions={false} onDelete={() => {}} />
                    ))}
                </div>
            )}
        </div>
    </div>
);
};

export default Dashboard;
