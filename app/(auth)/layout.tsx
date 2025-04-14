import { AuthLayoutContainer } from "./AuthLayout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayoutContainer>{children}</AuthLayoutContainer>;
}
