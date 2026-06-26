export interface LearningPlan {
    id: number;
    user_id: number;
    domain_id: number;
    current_knowledge: string;
    hours_per_day: number;
    duration_weeks: number;
    goal: string;
    status: string;
    created_at: string;
}  