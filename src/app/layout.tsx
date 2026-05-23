import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AuthProvider } from "@/context/AuthContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    applicationName: 'Diwaan Immo',
    description: 'Plateforme immobilière intelligente au Sénégal',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Diwaan Immo',
    },
    formatDetection: { telephone: false },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#006AFF" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icon-192x192.png" />
            </head>
            <body className={inter.className}>
                <AuthProvider>
                    <Providers>
                        <LayoutWrapper>
                            {children}
                        </LayoutWrapper>
                    </Providers>
                </AuthProvider>
                <ServiceWorkerRegistrar />
            </body>
        </html>
    );
}
