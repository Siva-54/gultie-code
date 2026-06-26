import BlogCard from "../components/BlogCard";
import Button from "../components/common/Button";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { getBlogs, createBlog, deleteBlog } from "../services/blogService";
import { useAuth } from "../contexts/AuthContext";
import CreateBlogModal from "../components/CreateBlogModal";

import type { Blog } from "../types/blog";

const BlogsPage = () => {
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { user } = useAuth();

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await getBlogs();
            const sortedBlogs = [...data].sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            setBlogs(sortedBlogs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBlog = async (title: string, content: string) => {
        try {
            await createBlog(title, content);
            setShowCreateModal(false);
            await fetchBlogs();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteBlog = async (blogId: number) => {
        const confirmed = window.confirm("Delete this blog?");

        if (!confirmed) {
            return;
        }

        try {
            await deleteBlog(blogId);
            await fetchBlogs();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredBlogs = blogs.filter(
        (blog) => blog.title.toLowerCase().includes(searchText.toLowerCase()) || 
        blog.author_username.toLowerCase().includes(searchText.toLowerCase()) || 
        blog.content.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-app">
                <Navbar />
                <div className="p-6">Loading Blogs...</div>
            </div>;
    }

    return( 
    <div className="min-h-screen bg-app text-black dark:text-white">
        <Navbar />
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Blogs</h1>
                <Button text="Create Blog" variant="primary" onClick={() => setShowCreateModal(true)} />
            </div>
            <div className="mb-6 flex gap-2">
                <div className="flex w-full gap-2">
                    <div className="flex-5">
                        <SearchBar searchText={searchText} setSearchText={setSearchText} />
                    </div>
                    <div className="flex-1">
                        <Button text="Refresh" variant="primary" onClick={fetchBlogs} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {filteredBlogs.length === 0 ? 
                <div className="mt-8 text-center text-muted">
                    No blogs found.
                </div> : filteredBlogs.map((blog) => (
                    <BlogCard 
                        key={blog.id} 
                        id={blog.id} 
                        title={blog.title} 
                        author={blog.author_username} 
                        authorId={blog.author_id} 
                        date={blog.created_at} 
                        content={blog.content} 
                        currentUser={user} 
                        showActions={true}
                        onDelete={handleDeleteBlog} />
                    ))}
            </div>
        </div>
            {showCreateModal && 
            <CreateBlogModal onSubmit={handleCreateBlog} onClose={() => setShowCreateModal(false)} />
            }
    </div>
    )
};

export default BlogsPage;