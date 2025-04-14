import { Suspense } from "react";
import DashboardPage from "./DashboardPage";
import Spinner from "@/components/Spinner";
import { useLosersGainers } from "@/utils/hooks/useLosersGainer";

// Mock data
const dummyData = [
  { Symbol: "NESTLE", Last: 750.25, PerChange: 2.5, High: 765.0 },
  { Symbol: "DANGCEM", Last: 250.0, PerChange: -1.2, High: 255.5 },
  { Symbol: "GTCO", Last: 32.45, PerChange: 0.8, High: 33.1 },
  { Symbol: "ZENITHBANK", Last: 28.7, PerChange: -0.5, High: 29.2 },
  { Symbol: "MTNN", Last: 175.3, PerChange: 1.7, High: 178.4 },
];

export default async function Page() {
  const { gainers = dummyData, losers = dummyData } = await useLosersGainers();
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <DashboardPage gainers={gainers} losers={losers} />
      </Suspense>
    </>
  );
}
