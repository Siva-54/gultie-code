import { apiFetch } from "./api";

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {

    return apiFetch(
        "/auth/register",
        {
            method: "POST",

            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );
};

export const loginUser = async (
    email: string,
    password: string
) => {

    return apiFetch(
        "/auth/login",
        {
            method: "POST",

            body: JSON.stringify({
                email,
                password
            })
        }
    );
};

export const getCurrentUser =
    async (
        token: string
    ) => {

        return apiFetch(
            "/auth/me"
        );
};