import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { getPlan, completeTask, deletePlan } from "../services/learningPlanService";
import type { LearningPlanTask } from "../types/learningPlanTask";

const LearningPlanPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState<any>(null);
    const [tasks, setTasks] = useState<LearningPlanTask[]>([]);

    const fetchPlan = async () => {
        try {
            setLoading(true);
            const data = await getPlan(Number(id));
            setPlan(data.plan);
            setTasks(data.tasks);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlan();
    }, [id]);

    const handleCompleteTask = async (taskId: number) => {
        await completeTask(taskId);
        await fetchPlan();
    };

    const handleDeletePlan = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this learning plan?");
        if (!confirmed) return;

        try {
            await deletePlan(plan.id);
            navigate("/learning");
        } catch (error) {
            console.error(error);
            alert("Failed to delete learning plan");
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-app"><Navbar /><div className="p-6">Loading plan...</div></div>;
    }

    if (!plan) {
        return <div className="min-h-screen bg-app"><Navbar /><div className="p-6">Plan not found</div></div>;
    }

    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;


    return (
        <div className="min-h-screen bg-app text-black dark:text-white">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => navigate("/learning")} className="text-primary hover:underline">← Back to Learning</button>
                    <button onClick={handleDeletePlan} className="bg-danger hover:bg-danger-hover text-white px-4 py-2 rounded">Delete Plan</button>
                </div>
                {/* Header */}
                <div className="bg-surface rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-surface p-4 rounded shadow">
                            <p>Total Tasks</p>
                            <h3 className="text-2xl font-bold">{tasks.length}</h3>
                        </div>

                        <div className="bg-surface p-4 rounded shadow">
                            <p>Completed</p>
                            <h3 className="text-2xl font-bold">{completedTasks}</h3>
                        </div>

                        <div className="bg-surface p-4 rounded shadow">
                            <p>Progress</p>
                            <h3 className="text-2xl font-bold">{progress}%</h3>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-3">Learning Plan</h1>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p><strong>Knowledge:</strong> {plan.current_knowledge}</p>
                            <p><strong>Hours / Day:</strong> {plan.hours_per_day}</p>
                        </div>
                        <div>
                            <p><strong>Duration:</strong> {plan.duration_weeks} weeks</p>
                            <p><strong>Goal:</strong> {plan.goal}</p>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="bg-surface rounded-lg shadow p-6 mb-6">
                    <div className="flex justify-between mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4">
                        <div className="bg-success h-4 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                </div>
                {/* Tasks */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Weekly Roadmap</h2>
                    <div className="space-y-4">
                        {tasks.map(task => (
                            <div key={task.id} className="bg-surface rounded-lg shadow p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold">Week {task.week_no} - {task.title}</h3>
                                        <p className="mt-2 text-muted">{task.description}</p>
                                        <div className="mt-3 text-primary font-medium">Checkpoint: {task.checkpoint}</div>
                                    </div>

                                    {task.completed ? (
                                        <button onClick={() => handleCompleteTask(task.id)} className="bg-success text-white px-4 py-2 rounded hover:cursor-pointer">Completed ✓</button>
                                    ) : (
                                        <button onClick={() => handleCompleteTask(task.id)} className="bg-success text-white px-4 py-2 rounded hover:cursor-pointer">Mark Complete</button>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPlanPage;
