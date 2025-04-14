"use client";
import {
  PageHeaderContainer,
  PageTitle,
} from "@/components/utilities/utility.component";
import { AccountList } from "./AccountList";
import { Tab, Tabs } from "@/components/utilities/tab";
import { JournalList } from "./JournalList";

export const AccountingPage = ({ data }: { data: Record<string, any>[] }) => {
  return (
    <div style={{ paddingRight: "2.563rem" }}>
      <PageHeaderContainer
        style={{
          paddingLeft: "1.813rem",
          paddingTop: "2.5rem",
          marginBottom: "1.875rem",
        }}
      >
        <PageTitle>Accounting</PageTitle>
      </PageHeaderContainer>
      <Tabs>
        <Tab label="Chart of accounts">
          <AccountList />
        </Tab>
        <Tab label="Journals">
          <JournalList />
        </Tab>
        <Tab label="Reports">Reports</Tab>
      </Tabs>
    </div>
  );
};
