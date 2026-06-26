import { useEffect, useState } from "react";
import PendingUsersTable from "../components/admin/PendingUsersTable";
import UsersTable from "../components/admin/UsersTable";
import AdminStats from "../components/admin/AdminStats";
import Navbar from "../components/Navbar/Navbar";
import { getUsers, getPendingUsers } from "../services/adminService";

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    status: string;
    email_verified: boolean;
}

const AdminPage = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);

    const fetchUsers =
    async () => {

        const data =
            await getUsers();

        setUsers(data);
    };

    const fetchPendingUsers =
    async () => {

        const data =
            await getPendingUsers();

        setPendingUsers(data);
    };

    useEffect(() => {

        fetchUsers();

        fetchPendingUsers();

    }, []);

    return (
        <div className="min-h-screen bg-app text-black dark:text-white">

            <Navbar />

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Admin Dashboard
                </h1>

                <AdminStats
                    users={users}
                />

                <PendingUsersTable
                    users={pendingUsers}
                    refreshUsers={fetchUsers}
                    refreshPendingUsers={
                        fetchPendingUsers
                    }
                />

                <UsersTable
                    users={users}
                    refreshUsers={fetchUsers}
                />

            </div>

        </div>
    );
};

export default AdminPage;