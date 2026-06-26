import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import DomainCard from "../components/DomainCard";
import { getDomains } from "../services/learningService";
import type { Domain } from "../types/domain";
import { getMyPlans } from "../services/learningPlanService";
import { useNavigate } from "react-router-dom";

export interface UserPlan {
    id: number;
    domain_name: string;
    duration_weeks: number;
    goal: string;
    progress: number;
    completed_tasks: number;
    total_tasks: number;
}

const Learning = () => {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState<UserPlan[]>([]);
    const navigate = useNavigate();

    const fetchDomains = async () => {
        try {
            setLoading(true);
            const data = await getDomains();
            setDomains(data);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlans = async () => {
        try {

            const data =
                await getMyPlans();

            setPlans(data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchDomains();
        fetchPlans();
    }, []);


    return (
        <div className="min-h-screen bg-app text-black dark:text-white">
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Your Learning Plans</h1>

                {plans.length === 0 ? (
                    <div className="bg-surface rounded-lg shadow p-6">No plans generated yet.</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                        {plans.map(plan => (
                            <div key={plan.id} onClick={() => navigate(`/learning-plans/${plan.id}`)} className="bg-surface rounded-lg shadow p-5 cursor-pointer hover:shadow-lg transition">
                                <h3 className="text-xl font-bold">{plan.domain_name}</h3>
                                <p className="text-muted mt-2">{plan.goal}</p>

                                <div className="mt-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{plan.progress}%</span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div className="bg-success h-2 rounded-full" style={{ width: `${plan.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Learning Domains</h1>

                {loading ? (
                    <p>Loading domains...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {domains.map((domain) => (
                            <DomainCard key={domain.id} id={domain.id} domainName={domain.name} description={domain.description} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Learning;
