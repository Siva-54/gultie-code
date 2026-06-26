import { useState } from "react";
import Button from "./common/Button";

interface Props {
    onSubmit: (title: string, content: string) => Promise<void>;
    onClose: () => void;
}

const CreateBlogModal = ({ onSubmit, onClose }: Props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-surface p-6 rounded w-[600px]">
                <h2 className="text-xl font-bold mb-4">Create Blog</h2>
                <input className="w-full border p-2 mb-3 rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="w-full border p-2 mb-3 rounded h-40" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />

                <div className="flex justify-end gap-2">
                    <Button text="Cancel" variant="secondary" onClick={onClose} />
                    <Button text="Create" variant="primary" onClick={() => onSubmit(title, content)} />
                </div>
            </div>
        </div>
    );
};

export default CreateBlogModal;
