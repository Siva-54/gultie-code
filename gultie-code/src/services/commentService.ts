import { apiFetch }
from "./api";

export const getComments =
    (blog_id: number) =>
        apiFetch(
            `/blogs/${blog_id}/comments`,
        );

export const createComment =
    (
        blog_id: number,
        comment: string
    ) =>
        apiFetch(
            `/blogs/${blog_id}/comments`,
            {
                method: "POST",

                body: JSON.stringify({
                    blog_id,
                    comment
                })
            }
        );

export const deleteComment =
    (comment_id: number) =>
        apiFetch(
            `/comments/${comment_id}/delete`,
            {
                method: "PATCH"
            }
        );