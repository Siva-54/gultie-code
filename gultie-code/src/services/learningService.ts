import { apiFetch } from "./api";

export const getDomains = () => apiFetch("/domains");

export const getDomainById = (
    id: number
) =>
    apiFetch(`/domains/${id}`);

export const getLevelsByDomain = (
    domainId: number
) =>
    apiFetch(
        `/levels/domain/${domainId}`
    );