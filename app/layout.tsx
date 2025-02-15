import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/auth";
import Script from "next/script";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";

config.autoAddCss = false;

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextThemesProvider attribute="class" defaultTheme="system">
                    <AuthProvider>{children}</AuthProvider>
                    <Toaster />
                </NextThemesProvider>
            </body>
        </html>
    );
}
