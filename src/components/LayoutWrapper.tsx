'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Providers from './Providers';
import Footer from './Footer';
import { Toaster } from './ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathName = usePathname()
    const hidden = pathName.startsWith("/api/auth")
    return (
        <>
            <ClerkProvider>
                {!hidden ? (
                    <>
                        <Navbar></Navbar>
                        <main className="grainy-light flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
                            <div className="flex-1 flex flex-col h-full">
                                <Providers>{children}</Providers>
                            </div>
                            <Footer></Footer>
                        </main>
                        <Toaster></Toaster>
                    </>
                ) : (
                    <div className="w-full h-screen bg-black/40 flex items-center justify-center">
                        {children}
                    </div>
                )}
            </ClerkProvider>
        </>
    );
}
