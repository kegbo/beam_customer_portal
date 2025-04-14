import { Suspense } from "react";
import SettingPage from "./SettingPage";
import Spinner from "@/components/Spinner";

export default function Page() {
  const data: Record<string, any>[] = [
    {
      id: "699b3d15-34ce-44ad-a98e-b124ebd7e8bc",
      createdAt: "2025-02-18T07:40:05.992Z",
      firstName: "JOHN",
      middleName: "KENECHUKWU",
      lastName: "AGBANUSI",
      gender: "male",
      cscsCode: "37892002",
      status: "verified",
      email: "john.a@credpal.com",
      phoneNumber: "+2347012352890",
    },
    {
      id: "699b3d15-34ce-44ad-a98e-b124ebd7e8bc",
      createdAt: "2025-02-18T07:40:05.992Z",
      firstName: "JOHN",
      middleName: "KENECHUKWU",
      lastName: "AGBANUSI",
      gender: "male",
      cscsCode: "37892002",
      status: "verified",
      email: "john.a@credpal.com",
      phoneNumber: "+2347012352890",
    },
  ];
  return (
    <Suspense fallback={<Spinner />}>
      {" "}
      <SettingPage />
    </Suspense>
  );
}
