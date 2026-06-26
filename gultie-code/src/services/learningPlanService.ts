import { apiFetch } from "./api";

export const generatePlan = (
    data: {
        domain_id: number;
        current_knowledge: string;
        hours_per_day: number;
        duration_weeks: number;
        goal: string;
    }
) =>
    apiFetch(
        "/learning-plans/generate",
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );

export const getMyPlans =
    () =>
        apiFetch(
            "/learning-plans"
        );

export const getPlan =
    (planId: number) =>
        apiFetch(
            `/learning-plans/${planId}`
        );

export const completeTask =
    (taskId: number) =>
        apiFetch(
            `/learning-plans/tasks/${taskId}/complete`,
            {
                method: "PATCH"
            }
        );

export const deletePlan = (
    planId: number
) =>
    apiFetch(
        `/learning-plans/${planId}`,
        {
            method: "DELETE"
        }
    );