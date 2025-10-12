import type {Metadata} from "next";
import "@/styles/globals.css";
import {fontSans, fontMono} from "@/lib/fonts";
import Header from "@/components/common/header";
import {ThemeProvider} from "next-themes";
import {Footer} from "@/components/common/footer";
import React from "react";
import {DynamicBreadcrumb} from "@/components/common/dynamic-breadcrumb";
import {FluidGradientBackground} from "@/components/common/background-svg";

export const metadata: Metadata = {
    title: "Sonar",
    description: "Um identificador de trilhas e gerador de EDL baseado em IA",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body
            className={`${fontSans.variable} ${fontMono.variable} font-sans bg-background text-foreground antialiased`}
        >

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <FluidGradientBackground/>
            <Header/>
            <main className="min-h-screen">
                <div className="container mx-auto px-6">

                    <DynamicBreadcrumb/>
                </div>
                {children}
            </main>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}