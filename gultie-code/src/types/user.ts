export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    status: string;
    email_verified: boolean;
    created_at: string;
    approved_at?: string;
    rejected_at?: string;
    deleted_at?: string;
}