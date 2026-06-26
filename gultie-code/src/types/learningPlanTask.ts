export interface LearningPlanTask {
    id: number;
    plan_id: number;
    week_no: number;
    title: string;
    description: string;
    checkpoint: string;
    completed: boolean;
    completed_at?: string;
}