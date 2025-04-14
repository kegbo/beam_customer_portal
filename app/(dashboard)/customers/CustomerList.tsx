"use client";
import { MoreIcon, ChartIcon, UserTickIcon, AddIcon } from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Column, Table } from "@/components/table";
import Button from "@/components/utilities/Button";
import { QueryTab } from "@/components/utilities/query-tab";
import { authApiService } from "@/utils/api/services/auth.service";
import { addCustomerDrawerAtom } from "@/utils/atom";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

export const CustomerList = () => {
  const setOpen = useSetAtom(addCustomerDrawerAtom);
  const { isLoading, data } = useQuery({
    queryKey: ["customers"],
    queryFn: () => authApiService.getAllCustomers({ page: 1, limit: 20 }),
  });
  const router = useRouter();

  const columns: Column[] = [
    {
      header: "Date",
      accessor: "createdAt",
      render: (value: any) => value,
    },
    {
      header: "Full Name",
      accessor: "fullName",
      render: (_, { firstName, lastName }) => firstName + " " + lastName,
    },
    { header: "Email Address", accessor: "email" },
    { header: "Phone Number", accessor: "phoneNumber" },
    { header: "Status", accessor: "status" },
    {
      header: "Action",
      accessor: "action",
      render: (_, { id }) => (
        <SmartPopup trigger={<MoreIcon width={24} height={24} />}>
          <PopupItem
            icon={<ChartIcon width={16} height={16} />}
            label="View Profile"
            onClick={() => {
              router.push(`/customers/${id}`);
            }}
          />
          <PopupItem
            icon={<UserTickIcon width={16} height={16} />}
            label="Assign to"
            onClick={() => {}}
          />
        </SmartPopup>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1.875rem",
        }}
      >
        <QueryTab
          queryKey="status"
          data={["All", "Active", "Pending", "Suspended"]}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <DateRangePicker
            showButton
            variant="filter"
            placeholder="Filter by date"
            width="180px"
            onClick={(startDate) => alert(startDate)}
          /> */}
          <Button
            height="32px"
            icon={<AddIcon width={18} height={18} />}
            onClick={() => setOpen(true)}
          >
            Add customer
          </Button>
        </div>
      </div>
      <Table
        isLoading={isLoading}
        columns={columns}
        data={data?.data?.items || []}
      />
    </>
  );
};
