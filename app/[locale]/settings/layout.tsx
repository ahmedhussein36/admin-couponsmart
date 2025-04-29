import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/toaster";
import type React from "react";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LanguageProvider>
            <Toaster />
            <div className="min-h-screen">
                {/* You could add a dashboard header/sidebar here */}
                <main>{children}</main>
            </div>
        </LanguageProvider>
    );
}
