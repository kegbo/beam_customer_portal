import { Suspense } from "react";
import { CustomerPage } from "./CustomerPage";
import Spinner from "@/components/Spinner";

export default async function Page(props: any) {
  return (
    <Suspense fallback={<Spinner />}>
      {" "}
      <CustomerPage />
    </Suspense>
  );
}
