"use client"
import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
    accessToken?: string;
    refreshToken?: string;
    isAuth: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

type TProps = { children: ReactNode; accessToken?: string; refreshToken?: string; };

export const AuthProvider = ({ children, accessToken, refreshToken }: TProps) => {
    const isAuth = !!accessToken;
    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};