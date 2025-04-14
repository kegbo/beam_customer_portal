import { Suspense } from "react";
import { TransactionPage } from "./TransactionPage";
import Spinner from "@/components/Spinner";
export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      {" "}
      <TransactionPage />
    </Suspense>
  );
}
