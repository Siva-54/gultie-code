import { useNavigate } from "react-router-dom";

export interface DomainCardProps {
    id: number;
    domainName: string;
    description: string;
    minimumDurationWeeks?: number;
}

const DomainCard = ({ id, domainName, description, minimumDurationWeeks }: DomainCardProps) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/learning/${id}`)} className="bg-surface shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all">
            <h2 className="text-xl font-bold mb-2">{domainName}</h2>
            <p className="text-muted mb-4">{description}</p>
            {minimumDurationWeeks && <div className="text-sm text-muted">Minimum Duration: {minimumDurationWeeks} weeks</div>}
            <div className="mt-4 text-primary text-sm font-medium">View Learning Path →</div>
        </div>
    );
};

export default DomainCard;
