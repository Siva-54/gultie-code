import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { getBlogById } from "../services/blogService";
import { getComments, createComment, deleteComment } from "../services/commentService";
import { useAuth } from "../contexts/AuthContext";
import type { Blog } from "../types/blog";
import type { Comment } from "../types/comment";

const BlogDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const blogData = await getBlogById(Number(id));
            const commentsData = await getComments(Number(id));
            setBlog(blogData);
            setComments(commentsData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleAddComment = async () => {
        if (!commentText.trim()) {
            return;
        }

        try {
            await createComment(Number(id), commentText);
            setCommentText("");
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        const confirmed = window.confirm("Delete this comment?");

        if (!confirmed) {
            return;
        }

        try {
            await deleteComment(commentId);
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-app">
            <Navbar />
            <div className="p-6">Loading...</div>
            </div>;
    }

    if (!blog) {
        return <div className="min-h-screen bg-app">
            <Navbar />
            <div className="p-6">Blog not found.</div>
            </div>;
    }

    return (
    <div className="min-h-screen bg-app text-black dark:text-white">
        <Navbar />
        <div className="mx-auto max-w-5xl p-6">
            <button onClick={() => navigate("/blogs")} 
            className="mb-6 cursor-pointer text-sm font-medium text-primary hover:text-primary">
                ← Back to Blogs
            </button>
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <p className="mt-3 text-muted">By {blog.author_username}</p>
            <div className="mt-8 text-lg leading-8">{blog.content}
            </div>
            <div className="mt-14">
                <h2 className="mb-6 text-2xl font-bold">Comments ({comments.length})</h2>
                <div className="mb-8 flex gap-3">
                    <input type="text" 
                        placeholder="Write a comment..." 
                        value={commentText} onChange={(e) => setCommentText(e.target.value)} 
                        className="flex-1 rounded-lg border border-app bg-surface px-4 py-3 focus:outline-none" />
                    <button onClick={handleAddComment} 
                        disabled={!commentText.trim()} 
                        className={`px-5 py-3 rounded-lg text-white transition ${commentText.trim() ? "bg-primary hover:bg-primary-hover" : "bg-muted cursor-not-allowed"}`}>
                    Post
                    </button>
                </div>
                <div className="space-y-1">{comments.length === 0 ? 
                    <div className="text-muted">No comments yet.</div> 
                    : comments.map((comment) => { const canDelete = user?.role === "admin" 
                        || user?.id === comment.user_id; return( 
                        <div key={comment.id} className="border-b border-app py-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold">{comment.commenter_username}</p>
                                    <p className="mt-1 text-muted">{comment.comment}</p>
                                </div>
                                {canDelete && 
                                <button onClick={() => handleDeleteComment(comment.id)} 
                                    className="text-sm text-danger hover:text-danger-hover">Delete
                                </button>}
                            </div>
                        </div>); })}
                </div>
            </div>
        </div>
    </div>
);
};

export default BlogDetailsPage;