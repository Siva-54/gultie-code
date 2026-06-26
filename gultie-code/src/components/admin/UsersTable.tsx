import type { User } from "../../pages/AdminPage";
import Button from "../common/Button";

import {
    deleteUser,
    changeRole
} from "../../services/adminService";

interface Props {
    users: User[];
    refreshUsers: () => Promise<void>;
}

const UsersTable = ({
    users,
    refreshUsers
}: Props) => {

    const handleDeleteUser = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Delete this user?"
            );

        if (!confirmed) return;

        await deleteUser(id);

        await refreshUsers();
    };

    const handleChangeRole = async (
        id: number,
        role: string
    ) => {

        const confirmed =
            window.confirm(
                `Change role to ${role}?`
            );

        if (!confirmed) return;

        await changeRole(
            id,
            role
        );

        await refreshUsers();
    };

    return (
        <div className="bg-surface rounded shadow p-4">

            <h2 className="text-xl font-bold mb-4">
                All Users
            </h2>

            <table className="w-full">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>{user.username}</td>

                            <td>{user.email}</td>

                            <td>{user.status}</td>

                            <td>

                                <select
                                    value={user.role}
                                    onChange={(e) =>
                                        handleChangeRole(
                                            user.id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="user">
                                        User
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>

                                </select>

                            </td>

                            <td>

                                <Button
                                    text={
                                        user.status === "deleted"
                                            ? "Deleted"
                                            : "Delete"
                                    }
                                    variant="danger"
                                    disabled={
                                        user.status === "deleted"
                                    }
                                    className="m-2"
                                    onClick={() =>
                                        handleDeleteUser(
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

export default UsersTable;