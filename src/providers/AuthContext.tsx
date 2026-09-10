"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

export interface AuthUser {
    id: string;
    fullName: string;
    userName: string | null;
    email: string | null;
    roles: string[];
}

interface AuthContextValue {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/auth/me`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data: AuthUser = await response.json();

            setUser(data);
        } catch (error) {
            console.error("Failed to get current user:", error);

            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refreshUser();
    }, [refreshUser]);

    const logout = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                }
            );

            if (response.ok) {
                setUser(null);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: user !== null,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}