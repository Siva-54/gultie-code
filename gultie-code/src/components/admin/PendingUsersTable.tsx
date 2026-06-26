import Button from "../common/Button";
import type { User } from "../../pages/AdminPage";

import {
    approveUser,
    rejectUser
} from "../../services/adminService";

interface Props {
    users: User[];
    refreshUsers: () => Promise<void>;
    refreshPendingUsers: () => Promise<void>;
}

const PendingUsersTable = ({
    users,
    refreshUsers,
    refreshPendingUsers
}: Props) => {

    const handleApprove = async (
        id: number
    ) => {

        await approveUser(id);

        await refreshUsers();

        await refreshPendingUsers();
    };

    const handleReject = async (
        id: number
    ) => {

        await rejectUser(id);

        await refreshUsers();

        await refreshPendingUsers();
    };

    return (
        <div className="bg-surface rounded shadow p-4 mb-8">

            <h2 className="text-xl font-bold mb-4">
                Pending Approvals
            </h2>

            <table className="w-full">

                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>{user.username}</td>

                            <td>{user.email}</td>

                            <td className="flex gap-2">

                                <Button
                                    text="Approve"
                                    variant="primary"
                                    onClick={() =>
                                        handleApprove(
                                            user.id
                                        )
                                    }
                                />

                                <Button
                                    text="Reject"
                                    variant="danger"
                                    onClick={() =>
                                        handleReject(
                                            user.id
                                        )
                                    }
                                />

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default PendingUsersTable;