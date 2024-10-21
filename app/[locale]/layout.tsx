import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { MainSidebar } from "@/app/components/navMenu/MainSidebar";
import Header from "../components/header/Header";
import { Providers } from "../hooks/providers";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect, usePathname } from "next/navigation";
import Login from "./login/Login";
import ToasterProvider from "../providers/ToastProvider";

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
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
            <head>
                <title> Admin panal: Dashbourd</title>
            </head>
            <body>
                <div className="z-10">
                    <ToasterProvider />
                </div>
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        {!auth ? (
                            <Login />
                        ) : (
                            <>
                                <Header />
                                <main className="bg-slate-100 dark:bg-gray-800 grid w-full">
                                    <div className=" col-span-1 w-[170px]">
                                        <MainSidebar />
                                    </div>
                                    <div className="p-6 ">{children}</div>
                                </main>
                            </>
                        )}
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
