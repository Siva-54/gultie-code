import { User } from "lucide-react";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";

export interface BlogCardProps {
    id: number;
    title: string;
    author: string;
    authorId: number;
    date: string;
    content: string;
    currentUser: any;
    showActions?: boolean;
    onDelete: (blogId: number) => void;
}

const BlogCard = (
    { id, title, author, authorId, date, content, currentUser, showActions, onDelete }: BlogCardProps
) => {
    const canDelete = currentUser?.role === "admin" || currentUser?.id === authorId;
    const navigate = useNavigate()
    const CONTENT_PREVIEW_LIMIT = 250;
    const isContentTruncated = content.length > CONTENT_PREVIEW_LIMIT;

    return (
        <div className="bg-surface rounded-lg shadow-md p-5">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted">
                    <User size={18} />
                    <p>{author}</p>
                </div>
                <p className="text-sm text-muted">{new Date(date).toLocaleDateString()}</p>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mt-3 cursor-pointer hover:text-primary transition"
                onClick={() =>
                    navigate(`/blogs/${id}`)
                }>{title}
            </h3>

            {/* Content */}
            <p className="mt-3 text-muted">
                {
                    isContentTruncated
                        ? `${content.slice(0, CONTENT_PREVIEW_LIMIT)}...`
                        : content
                }
            </p>
            {/* Footer */}
            <div className="flex justify-between items-center mt-4">
                {isContentTruncated ? (
                    <button onClick={() => navigate(`/blogs/${id}`)} className="flex items-center gap-1 text-primary hover:text-primary text-sm font-medium">↓ Read More</button>
                ) : (
                    <div />
                )}

                {showActions !== false && canDelete && (
                    <Button text="Delete" variant="danger" onClick={() => onDelete(id)} />
                )}
            </div>

        </div>
    );
};

export default BlogCard;
