import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { User } from "../types/user";

import { getCurrentUser } from "../services/authServices";

interface AuthContextType {
    user: User | null;
    token: string | null;
    setUser: React.Dispatch<
        React.SetStateAction<User | null>
    >;
    login: (token: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext =
    createContext<AuthContextType | null>(
        null
    );

export const useAuth = () => {

    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children
}: AuthProviderProps) => {

    const [user, setUser] =
        useState<User | null>(null);

    const [token, setToken] =
        useState<string | null>(
            localStorage.getItem("token")
        );

    const [loading, setLoading] =
        useState(true);

    const login = async (
        jwtToken: string
    ) => {

        localStorage.setItem(
            "token",
            jwtToken
        );

        setToken(jwtToken);

        const currentUser =
            await getCurrentUser(
                jwtToken
            );

        setUser(currentUser);
    };

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        setToken(null);

        setUser(null);
    };

    useEffect(() => {

        const fetchUser =
            async () => {

                if (!token) {
                    setLoading(false);
                    return;
                }

                try {

                    const currentUser =
                        await getCurrentUser(
                            token
                        );

                    setUser(currentUser);

                } catch (error) {

                    console.error(
                        "Failed to load user",
                        error
                    );

                    logout();

                } finally {

                    setLoading(false);

                }
            };

        fetchUser();

    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setUser,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};