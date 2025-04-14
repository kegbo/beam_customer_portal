import { Table } from "@/components/table";
import { AccountingPage } from "./AccountPage";
import { authApiService } from "@/utils/api/services/auth.service";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function Page() {
  const data: User[] = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "User" },
    { name: "Alice Brown", email: "alice@example.com", role: "Manager" },
    { name: "Bob Green", email: "bob@example.com", role: "Editor" },
    { name: "Eve Black", email: "eve@example.com", role: "User" },
    {
      name: "Charlie White",
      email: "charlie@example.com",
      role: "Guest",
    },
  ];
  return (
    <Suspense fallback={<Spinner />}>
      {" "}
      <AccountingPage data={data} />
    </Suspense>
  );
}
