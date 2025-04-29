import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { MainSidebar } from "@/app/components/navMenu/MainSidebar";
import Header from "../components/header/Header";
import getCurrentUser from "../actions/getCurrentUser";
import Login from "./login/Login";
import ToasterProvider from "../providers/ToastProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import TopLoader from "../components/TopLoader";
import { ToastProvider } from "@/components/ui/use-toast";

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const auth = await getCurrentUser();

    return (
        <html
            lang={locale}
            dir={locale === "ar" ? "rtl" : "ltr"}
            suppressHydrationWarning
        >
            <head>
                <title> Admin panal: Dashbourd</title>
            </head>
            <body>
                <TopLoader />
                <ToasterProvider />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ToastProvider>
                        <NextIntlClientProvider messages={messages}>
                            {!auth ? (
                                <Login />
                            ) : (
                                <>
                                    <Header />
                                    <main className=" grid w-full bg-slate-100 dark:bg-transparent">
                                        <div className=" col-span-1 w-[170px]">
                                            <MainSidebar />
                                        </div>
                                        <div className="p-6 ">{children}</div>
                                    </main>
                                </>
                            )}
                        </NextIntlClientProvider>
                    </ToastProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
