import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/auth";
import Script from "next/script";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LoadingProvider } from "./_contexts/LoadingContext";
import LoadingIndicator from "./_components/loading-indicator";
import Header from "./_components/header";
import Footer from "./_components/footer";

config.autoAddCss = false;

const firaSans = Fira_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-fira-sans",
});

export const metadata: Metadata = {
    title: "Avalon RH",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-Br">
            <head>
                <Script
                    src="https://kit.fontawesome.com/ac142c9aae.js"
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                ></Script>
            </head>
            <body className={`antialiased ${firaSans.className}`}>
                <NextThemesProvider attribute="class" defaultTheme="system">
                    <AuthProvider>
                        <LoadingProvider>
                            <div className="flex min-h-screen w-full flex-col">
                                <Header />
                                <main className="flex w-full items-center justify-center">
                                    {children}
                                </main>
                                <Footer />
                            </div>

                            <LoadingIndicator />
                        </LoadingProvider>
                    </AuthProvider>
                    <Toaster />
                </NextThemesProvider>
            </body>
        </html>
    );
}
