"use client";

import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { SummaryPage } from "./SummaryPage";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      {" "}
      <SummaryPage />
    </Suspense>
  );
}
