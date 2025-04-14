import DatePicker from "@/components/DatePicker";
import { SearchInput } from "@/components/form";
import {
  MoreIcon,
  ChartIcon,
  UserTickIcon,
  AddIcon,
  ChevronDownIcon,
} from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import Select from "@/components/Select";
import { Column, Table } from "@/components/table";
import Button from "@/components/utilities/Button";

export const JournalList = () => {
  const columns: Column[] = [
    {
      header: "Date",
      accessor: "createdAt",
      width: "172px",
    },
    {
      header: "Number",
      accessor: "number",
      render: (value: any) => "-",
    },
    {
      header: "Code",
      accessor: "code",
      render: (value: any) => "-",
    },
    {
      header: "Memo/Description",
      accessor: "memo",
      render: (value: any) => value,
      width: "400px",
    },

    { header: "Amount", accessor: "amount" },
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
        <DatePicker width="200px" showButton />
        <SearchInput variant="ghost" placeholder="Search for account" />
        <Button
          iconPosition="right"
          icon={<AddIcon stroke="white" width={18} height={18} />}
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
      <Table columns={columns} data={[]} />
    </>
  );
};
