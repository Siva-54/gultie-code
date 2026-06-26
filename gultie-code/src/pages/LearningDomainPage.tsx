import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { getDomainById, getLevelsByDomain } from "../services/learningService";
import type { Domain } from "../types/domain";
import type { Level } from "../types/level";
import GeneratePlanModal from "../components/GeneratePlanModal";
import { generatePlan } from "../services/learningPlanService";


const LearningDomainPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [domain, setDomain] = useState<Domain | null>(null);
    const [levels, setLevels] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true);
    const [showGenerateModal, setShowGenerateModal] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const domainData = await getDomainById(Number(id));
            const levelData = await getLevelsByDomain(Number(id));
            setDomain(domainData);
            setLevels(levelData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleGeneratePlan =
        async (
            knowledge: string,
            hours: number,
            duration: number,
            goal: string
        ) => {

            if (!domain) {
                return;
            }

            const plan =
                await generatePlan({
                    domain_id: domain.id,
                    current_knowledge: knowledge,
                    hours_per_day: hours,
                    duration_weeks: duration,
                    goal
                });
            console.log(plan.plan_id);
            navigate(
                `/learning-plans/${plan.plan_id}`
            );
        };


    if (loading) {
        return <div className="min-h-screen bg-app"><Navbar /><div className="p-6">Loading...</div></div>;
    }

    if (!domain) {
        return <div className="min-h-screen bg-app"><Navbar /><div className="p-6">Domain not found</div></div>;
    }
    return (
        <div className="min-h-screen bg-app text-black dark:text-white">
            <Navbar />
            <div className="p-6">
                <button onClick={() => navigate("/learning")} className="text-primary hover:underline mb-6">← Back to Domains</button>

                {/* Domain Details */}
                <div className="bg-surface rounded-lg shadow p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">{domain.name}</h1>
                    <p className="text-muted mb-4">{domain.description}</p>
                    <div className="text-sm text-muted">Minimum Recommended Duration: <span className="font-semibold">{domain.minimum_duration_weeks} Weeks</span></div>
                    <button onClick={() => setShowGenerateModal(true)} className="mt-6 px-5 py-2 bg-primary text-white rounded">Generate AI Plan</button>
                </div>

                {/* Levels */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Learning Path</h2>
                    {levels.length === 0 ? (
                        <div className="text-muted">No levels available.</div>
                    ) : (
                        <div className="space-y-4">
                            {levels.map((level) => (
                                <div key={level.id} className="bg-surface rounded-lg shadow p-5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">{level.order_no}</div>
                                        <h3 className="text-lg font-bold">{level.title}</h3>
                                    </div>
                                    <p className="text-muted">{level.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showGenerateModal && domain && (
                <GeneratePlanModal domainId={domain.id} minimumDurationWeeks={domain.minimum_duration_weeks} onGenerate={handleGeneratePlan} onClose={() => setShowGenerateModal(false)} />
            )}
        </div>
    );
};

export default LearningDomainPage;
