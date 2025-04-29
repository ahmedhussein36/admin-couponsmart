/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { useState, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, X, XCircle } from "lucide-react";

interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: "default" | "destructive";
    duration?: number | 5000;
}

interface ToastContextType {
    toast: (toast: Omit<Toast, "id">) => void;
    dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Use useCallback to prevent unnecessary re-renders
    const toast = useCallback((newToast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { ...newToast, id }]);

        if (newToast.duration !== Number.POSITIVE_INFINITY) {
            setTimeout(() => {
                dismiss(id);
            }, newToast.duration || 5000);
        }
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const contextValue = useCallback(
        () => ({ toast, dismiss }),
        [toast, dismiss]
    );

    return (
        <ToastContext.Provider value={contextValue()}>
            {children}
            <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className={`p-4 rounded-lg shadow-lg backdrop-blur-md border ${
                                toast.variant === "destructive"
                                    ? "bg-red-700/10 border-red-600 text-red-500"
                                    : "bg-green-700/30 border-green-600"
                            } max-w-sm w-full`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        {toast.variant !== "destructive" ? (
                                            <CheckCircleIcon className=" h-6 w-6 text-green-500" />
                                        ) : (
                                            <XCircle className=" h-6 w-6 text-red-500" />
                                        )}
                                        <h3 className="font-medium">
                                            {toast.title}
                                        </h3>
                                    </div>
                                    {toast.description && (
                                        <p className="text-sm text-muted-foreground">
                                            {toast.description}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => dismiss(toast.id)}
                                    className="ml-4 p-1 rounded-full hover:bg-gray-800/50"
                                    aria-label="Close toast"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
