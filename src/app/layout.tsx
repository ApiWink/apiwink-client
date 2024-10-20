"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Web3Provider } from "./contexts/Web3Provider";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { createTheme } from "@mantine/core";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

const theme = createTheme({});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DynamicContextProvider
          settings={{
            environmentId: process.env
              .NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID as string,
          }}
        >
          <MantineProvider theme={theme}>
            <Web3Provider>{children}</Web3Provider>
          </MantineProvider>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
