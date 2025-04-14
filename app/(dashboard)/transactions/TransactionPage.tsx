"use client";
import { ChartIcon, MoreIcon, UserTickIcon } from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Column } from "@/components/table";
import Button from "@/components/utilities/Button";
import { QueryTab } from "@/components/utilities/query-tab";
import {
  PageHeaderContainer,
  PageTitle,
} from "@/components/utilities/utility.component";
import { TransactionMetric } from "./TransactionMetric";
import { TransactionList } from "./TransactionList";
import { DocumentDuplicate } from "@/components/icons/document-duplicate";

export const TransactionPage = () => {
  return (
    <div
      style={{
        paddingLeft: "1.813rem",
        paddingTop: "2.5rem",
        paddingRight: "1.813rem",
      }}
    >
      <PageHeaderContainer>
        <PageTitle>Transactions</PageTitle>
      </PageHeaderContainer>
      <TransactionMetric />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.875rem",
        }}
      >
        <QueryTab queryKey="status" data={["All", "Completed", "Pending"]} />
        <Button
          height="32px"
          icon={<DocumentDuplicate width={20} height={20} />}
        >
          Export CSV
        </Button>
      </div>

      <TransactionList />
    </div>
  );
};
