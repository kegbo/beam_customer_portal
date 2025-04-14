import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { Inter } from "next/font/google";
import { Alert } from "@/components/Alert";
import { Provider } from "@/utils/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beam Markets",
  description: "Trade with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Alert />
        <StyledComponentsRegistry>
          <Provider>{children}</Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
