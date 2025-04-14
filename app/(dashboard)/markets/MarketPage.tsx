"use client";
import { SearchInput } from "@/components/form/elements";

import { QueryTab } from "@/components/utilities/query-tab";
import {
  PageHeaderContainer,
  PageTitle,
} from "@/components/utilities/utility.component";
import { SecurityList } from "./SecurityList";
import { BuySellModal } from "./BuySellModal";

export const MarketPage = ({ data }: { data: Record<string, any>[] }) => {
  return (
    <div
      style={{
        paddingLeft: "1.813rem",
        paddingTop: "2.5rem",
        paddingRight: "1.813rem",
      }}
    >
      <PageHeaderContainer>
        <PageTitle>Equity Market</PageTitle>
        <SearchInput placeholder="Search by stock name" />
      </PageHeaderContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.875rem",
        }}
      >
        <QueryTab
          queryKey="tab"
          data={["All", "Top Gainer", "Top Losers", "Mid Cap"]}
        />
      </div>

      <SecurityList data={data} />
      <BuySellModal />
    </div>
  );
};
