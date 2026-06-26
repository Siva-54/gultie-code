export interface Comment {
    id: number;
    blog_id: number;
    user_id: number;
    commenter_username: string;
    comment: string;
    created_at: string;
    status: string;
}