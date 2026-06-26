import { apiFetch }
from "./api";

export const getUsers =
    () =>
        apiFetch(
            "/admin/users"
        );

export const getPendingUsers =
    () =>
        apiFetch(
            "/admin/users/pending"
        );

export const approveUser =
    (id: number) =>
        apiFetch(
            `/admin/users/${id}/approve`,
            {
                method: "PATCH"
            }
        );

export const rejectUser =
    (id: number) =>
        apiFetch(
            `/admin/users/${id}/reject`,
            {
                method: "PATCH"
            }
        );

export const deleteUser =
    (id: number) =>
        apiFetch(
            `/admin/users/${id}/delete`,
            {
                method: "PATCH"
            }
        );

export const changeRole =
    (
        id: number,
        role: string
    ) =>
        apiFetch(
            `/admin/users/${id}/role`,
            {
                method: "PATCH",

                body: JSON.stringify({
                    role
                })
            }
        );