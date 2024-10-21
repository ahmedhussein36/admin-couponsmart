// hooks/useChangePassword.ts
import { useState } from "react";
import axios from "axios";

interface UseChangePassword {
    changePassword: (
        email: string,
        newPassword: string,
        userId: string
    ) => Promise<void>;
    error: string | null;
    loading: boolean;
}

export const useChangePassword = (): UseChangePassword => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const changePassword = async (
        userId: string,
        email: string,
        newPassword: string
    ) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`/api/changePassword/${userId}`, {
                email,
                newPassword,
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { changePassword, error, loading };
};
