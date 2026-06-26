import { useState } from "react";
import Button from "./common/Button";

interface Props {
    domainId: number;
    minimumDurationWeeks: number;
    onGenerate: (currentKnowledge: string, hoursPerDay: number, durationWeeks: number, goal: string) => Promise<void>;
    onClose: () => void;
}

const GeneratePlanModal = ({ minimumDurationWeeks, onGenerate, onClose }: Props) => {
    const [knowledge, setKnowledge] = useState("Beginner");
    const [hours, setHours] = useState(2);
    const [duration, setDuration] = useState(minimumDurationWeeks);
    const [goal, setGoal] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!goal.trim()) {
            alert("Please enter your learning goal.");
            return;
        }
        setLoading(true);
        try {
            await onGenerate(knowledge, hours, duration, goal);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-surface p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-2">Generate AI Learning Plan</h2>
                <p className="text-muted mb-6">Tell us about your current level and learning goals. AI will generate a personalized roadmap for you.</p>

                {/* Knowledge */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Current Knowledge Level</label>
                    <select value={knowledge} onChange={(e) => setKnowledge(e.target.value)} className="w-full border rounded p-2">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>

                {/* Hours */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Hours Available Per Day</label>
                    <input type="number" min={1} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full border rounded p-2" />
                </div>

                {/* Duration */}
                <div className="mb-4">
                    <label className="block font-medium mb-2">Learning Duration (Weeks)</label>
                    <input type="number" min={minimumDurationWeeks} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full border rounded p-2" />
                    <p className="text-sm text-muted mt-1">Minimum required duration: {minimumDurationWeeks} weeks</p>
                </div>

                {/* Goal */}
                <div className="mb-6">
                    <label className="block font-medium mb-2">What is your goal?</label>
                    <textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Example: Become internship ready in Machine Learning and build 2 projects." className="w-full border rounded p-3 h-32" />
                </div>

                <div className="flex justify-end gap-3">
                    <Button text="Cancel" variant="secondary" onClick={onClose} />
                    <Button text={loading ? "Generating..." : "Generate Plan"} variant="primary" disabled={loading || !goal.trim()} onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default GeneratePlanModal;
