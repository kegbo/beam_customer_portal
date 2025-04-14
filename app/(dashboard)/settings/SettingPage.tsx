"use client";
import { SearchInput } from "@/components/form";
import { QueryTab } from "@/components/utilities/query-tab";
import { Tab, Tabs } from "@/components/utilities/tab";
import {
  PageHeaderContainer,
  PageTitle,
} from "@/components/utilities/utility.component";
import { ConfigurationTab } from "./configuration/ConfigurationTab";

export default function SettingPage() {
  return (
    <div style={{ paddingRight: "2.563rem" }}>
      <PageHeaderContainer
        style={{
          paddingLeft: "1.813rem",
          paddingTop: "2.5rem",
          marginBottom: "1.875rem",
        }}
      >
        <PageTitle>Settings</PageTitle>
      </PageHeaderContainer>

      <Tabs>
        <Tab label="Configuration">
          <ConfigurationTab />
        </Tab>
        <Tab label="Trading Preferences">
          <p>Here is your Profile information.</p>
        </Tab>
        <Tab label="Market Data Settings">
          <p>Update your Settings here.</p>
        </Tab>
      </Tabs>
    </div>
  );
}
