import { SearchInput } from "@/components/form";
import {
  MoreIcon,
  ChartIcon,
  UserTickIcon,
  AddIcon,
  ChevronDownIcon,
} from "@/components/icons";
import DateRangePicker from "@/components/DatePicker";
import SmartPopup, { PopupItem } from "@/components/Popup";
import Select from "@/components/Select";
import { Column, Table } from "@/components/table";
import Button from "@/components/utilities/Button";
import { useQuery } from "@tanstack/react-query";
import { accountingApiService } from "@/utils/api/services/accounting.service";
import { AddAnAccountDrawer } from "./AddAnAccount";
import { useSetAtom } from "jotai";
import { addAnAccountDrawerStatus } from "@/utils/atom";
import { EditAnAccountDrawer } from "./EditAnAccount";

export const AccountList = () => {
  const setAnAccountDrawerOpen = useSetAtom(addAnAccountDrawerStatus);

  const { isLoading, data: result } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      accountingApiService.getChartOfAccounts({ page: 1, limit: 50 }),
  });

  const { data = [], meta = {} } = result?.data || {};

  const columns: Column[] = [
    {
      header: "Account Name",
      accessor: "name",
    },
    {
      header: "Account Type",
      accessor: "createdAt",
      render: (value: any) => "-",
    },
    {
      header: "Code",
      accessor: "code",
      render: (value: any) => "-",
    },
    {
      header: "Creation Date",
      accessor: "createdAt",
      render: (value: any) => value,
    },

    { header: "Status", accessor: "status" },
    {
      header: "Action",
      accessor: "action",
      render: () => (
        <SmartPopup trigger={<MoreIcon width={24} height={24} />}>
          <PopupItem
            icon={<ChartIcon width={16} height={16} />}
            label="View Profile"
            onClick={() => {}}
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
          justifyContent: "flex-end",
          marginTop: "18px",
          gap: "6px",
        }}
      >
        <DateRangePicker
          showButton
          onClick={(startDate: any) => alert(startDate)}
        />
        <Select
          width="104px"
          placeholder="Status"
          options={[]}
          onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <SearchInput variant="ghost" placeholder="Search for account" />
        <Button
          iconPosition="right"
          icon={<AddIcon stroke="white" width={18} height={18} />}
          onClick={() => setAnAccountDrawerOpen(true)}
        >
          Create new
        </Button>
        <Button
          borderColor="#149D52"
          background="white"
          color="#149D52"
          iconPosition="right"
          icon={<ChevronDownIcon width={12} height={12} color="#149D52" />}
        >
          Export
        </Button>
      </div>
      <Table
        columns={columns}
        isLoading={isLoading}
        data={data}
        totalPages={meta?.totalPages}
        currentPage={meta?.currentPage}
      />
      <AddAnAccountDrawer />
      <EditAnAccountDrawer />
    </>
  );
};
