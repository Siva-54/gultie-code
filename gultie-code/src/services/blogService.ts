import { apiFetch } from "./api";

export const getBlogs = () =>
    apiFetch("/blogs");

export const createBlog = (
    title: string,
    content: string
) =>
    apiFetch(
        "/blogs",
        {
            method: "POST",
            body: JSON.stringify({
                title,
                content
            })
        }
    );

export const deleteBlog = (
    blogId: number
) =>
    apiFetch(
        `/blogs/${blogId}/delete`,
        {
            method: "PATCH"
        }
    );

export const getBlogById = (
    blogId: number
) =>
    apiFetch(
        `/blogs/${blogId}`
    );