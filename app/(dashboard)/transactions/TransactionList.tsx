"use client";
import { ChartIcon, MoreIcon, UserTickIcon } from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Column, Table } from "@/components/table";
import { paymentApiService } from "@/utils/api/services/payment.service";
import { formatCurrency, formatToLocalDateOnly } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import router from "next/router";

export const TransactionList = () => {
  const page = useSearchParams().get("page");
  const status = useSearchParams().get("status") || "all";

  const { isLoading, data: result } = useQuery({
    queryKey: ["transactions", page, status],
    queryFn: () =>
      paymentApiService.getAllTransactions({ page: Number(page) || 1, status }),
  });
  const columns: Column[] = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Customer",
      accessor: "customer",
      render: (value) => value?.firstName + " " + value?.lastName,
    },
    {
      header: "Type",
      accessor: "type",
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value) => formatCurrency(value),
    },
    {
      header: "Date",
      accessor: "createdAt",
      render: (value) => formatToLocalDateOnly(value),
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Action",
      accessor: "action",
      render: (_, { id, status }) => (
        <SmartPopup
          defaultPosition="left"
          trigger={<MoreIcon width={24} height={24} />}
        >
          {status === "pending" && (
            <PopupItem
              icon={<ChartIcon width={16} height={16} />}
              label="Approve"
              onClick={() => {
                router.push(`/customers/${id}`);
              }}
            />
          )}
          <PopupItem
            icon={<UserTickIcon width={16} height={16} />}
            label="Generate Receipt"
            onClick={() => {}}
          />
        </SmartPopup>
      ),
    },
  ];

  const { items = [], meta } = result?.data || {};

  return (
    <Table
      isLoading={isLoading}
      columns={columns}
      data={items}
      totalPages={meta?.totalPages}
      currentPage={meta?.currentPage}
    />
  );
};
