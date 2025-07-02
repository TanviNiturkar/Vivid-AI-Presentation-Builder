// src/app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { PromptResetOnUserChange } from "@/lib/PromptResetOnUserChange";
import { SaveClerkUserIdToStorage } from "@/lib/SaveClerkUserIdToStorage";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vivid - AI PPT Generator",
  description: "Build AI Powered presentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      signInUrl="/sign-in?redirect_url=/dashboard"
      signUpUrl="/sign-up?redirect_url=/dashboard"
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SaveClerkUserIdToStorage /> 
            <PromptResetOnUserChange /> {/* ✅ Add this line */}
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
