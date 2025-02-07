"use client";
import { useState } from "react";
import axios from "axios";

export const useUpdate = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const updateData = async (
        apiUrl: string,
        data: any,
        newStatus?: string
    ) => {
        setLoading(true);
        setError(null);
        data.status = newStatus;

        try {
            const response = await axios.put(apiUrl, data);

            if (response.data.error) {
                throw new Error(response.data.error);
            }
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                // Handle Axios-specific errors
                if (err.response) {
                    // Server responded with a status other than 200 range
                    setError(
                        `Server Error: ${
                            err.response.data.message || err.response.statusText
                        }`
                    );
                } else if (err.request) {
                    // Request was made but no response received
                    setError(
                        "Network Error: No response received from server."
                    );
                } else {
                    // Something happened in setting up the request
                    setError(`Error: ${err.message}`);
                }
            } else {
                // Handle non-Axios errors
                setError(`Unexpected Error: ${err.message}`);
            }
            throw err; // Re-throw the error to be caught by toast.promise
        } finally {
            setLoading(false);
        }
    };

    return { updateData, error, loading };
};
