import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { handleGetUser } from "@/lib/server/auth";
import { Providers } from "@/components/layouts/Providers";
import { MainLayout } from "@/components/layouts/MainLayout";

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: "%s | GRF Talk",
    default: 'Home | GRF Talk'
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await handleGetUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <Providers>
          <MainLayout user={user}>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
