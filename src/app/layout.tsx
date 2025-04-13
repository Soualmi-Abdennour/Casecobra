import LayoutWrapper from "@/components/LayoutWrapper";
import { constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";




const recursive = Recursive({
    subsets: ["latin"],
});


export const metadata: Metadata = constructMetadata()

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={recursive.className}
            >
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
            </body>
        </html>
    );
}
