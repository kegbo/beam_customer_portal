"use client";
import {
  PageHeaderContainer,
  PageTitle,
} from "@/components/utilities/utility.component";
import { CustomerList } from "./CustomerList";
import { AddCustomerDrawer } from "./AddCustomerDrawer";
import { SearchInput } from "@/components/form";

export const CustomerPage = () => {
  return (
    <div
      style={{
        paddingLeft: "1.813rem",
        paddingTop: "2.5rem",
        paddingRight: "1.813rem",
      }}
    >
      <PageHeaderContainer>
        <PageTitle>Customers</PageTitle>

        <SearchInput placeholder="Search by name, email, phone number" />
      </PageHeaderContainer>
      <CustomerList />
      <AddCustomerDrawer />
    </div>
  );
};
