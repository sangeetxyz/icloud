import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/core/theme-provider";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import SessionProvider from "@/components/core/session-provider";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const sfProTextBold = localFont({
  src: "../public/fonts/SF-Pro-Text-Bold.otf",
  variable: "--font-sf-pro-text-bold",
});

const sfProTextRegular = localFont({
  src: "../public/fonts/SF-Pro-Text-Regular.otf",
  variable: "--font-sf-pro-text-regular",
});

const sfProTextLight = localFont({
  src: "../public/fonts/SF-Pro-Text-Light.otf",
  variable: "--font-sf-pro-text-light",
});

const sfProTextMedium = localFont({
  src: "../public/fonts/SF-Pro-Text-Medium.otf",
  variable: "--font-sf-pro-text-medium",
});

export const metadata: Metadata = {
  title: "iCloud",
  description: "Developed by sangeet.xyz",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={cn(
          sfProTextBold.variable,
          sfProTextRegular.variable,
          sfProTextLight.variable,
          sfProTextMedium.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <SessionProvider session={session}>
              <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}
              <Toaster />
            </SessionProvider>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
