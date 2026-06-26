import { apiFetch } from "./api";

export const getProfileStats =
    () =>
        apiFetch(
            "/auth/profile/stats"
        );