import type { User } from "../../pages/AdminPage";

interface Props {
    users: User[];
}

const AdminStats = ({
    users
}: Props) => {

    const approved =
        users.filter(
            user =>
                user.status === "approved"
        ).length;

    const pending =
        users.filter(
            user =>
                user.status === "pending"
        ).length;

    const rejected =
        users.filter(
            user =>
                user.status === "rejected"
        ).length;

    const deleted =
        users.filter(
            user =>
                user.status === "deleted"
        ).length;

    return (
        <div className="grid grid-cols-5 gap-4 mb-8">

            <div className="bg-surface p-4 rounded shadow">
                Total Users
                <div className="text-2xl font-bold">
                    {users.length}
                </div>
            </div>

            <div className="bg-surface p-4 rounded shadow">
                Approved
                <div className="text-2xl font-bold">
                    {approved}
                </div>
            </div>

            <div className="bg-surface p-4 rounded shadow">
                Pending
                <div className="text-2xl font-bold">
                    {pending}
                </div>
            </div>

           <div className="bg-surface p-4 rounded shadow">
                Rejected
                <div className="text-2xl font-bold">
                    {rejected}
                </div>
            </div>

            <div className="bg-surface p-4 rounded shadow">
                Deleted
                <div className="text-2xl font-bold">
                    {deleted}
                </div>
            </div>

        </div>
    );
};

export default AdminStats;