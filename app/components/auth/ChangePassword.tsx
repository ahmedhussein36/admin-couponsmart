"use client";
// components/ChangePassword.tsx
import { useChangePassword } from "@/app/hooks/useChangePassword";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";

interface ChPassProps {
    userEmail: string;
    userId: string;
}

const ChangePassword: React.FC<ChPassProps> = ({ userEmail, userId }) => {
    const [email, setEmail] = useState<string>(userEmail);
    const [newPassword, setNewPassword] = useState<string>("");
    const { changePassword, error, loading } = useChangePassword();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await changePassword(userId, email, newPassword);
        toast.success ("Password updated successfully")
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-start items-center gap-2  p-4"
        >
            <div className="w-full flex gap-2 mb-4 justify-start items-start">
                <label className="text-sm  w-1/5">User Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="shadow w-3/5 appearance-none focus:border-sky-400 
                    dark:bg-transparent dark:border-neutral-500 dark:focus:border-sky-400 
                    border-2 rounded-md py-2 px-3  leading-tight 
                    "
                />
            </div>
            <div className="mb-4 flex gap-2 w-full justify-start items-start">
                <label className="text-sm w-1/5">New Password</label>
                <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="shadow w-3/5 appearance-none focus:border-sky-400 
                    rounded-md dark:bg-transparent dark:border-neutral-500 dark:focus:border-sky-400 
                    border-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-sky-500 hover:bg-sky-600 text-black disabled:opacity-80
                py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
                {loading ? "Updating ..." : "Update Password"}
            </button>
            {error && (
                <p className="text-red-500 text-xs italic mt-4">{error}</p>
            )}
        </form>
    );
};

export default ChangePassword;
