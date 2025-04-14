import { useCallback } from "react";
import { JournalItem, JournalEntry } from "./JournalItem";
import { formatCurrency } from "@/utils/helper";
import Button from "../utilities/Button";
import { useQuery } from "@tanstack/react-query";
import { accountingApiService } from "@/utils/api/services/accounting.service";
import {
  JournalActionButtonContainer,
  JournalBody,
  JournalFormFooter,
  JournalHeaderColumn,
  JournalHeaderContainer,
} from "./JournalInput.style";

const JournalFormHeader = () => {
  return (
    <JournalHeaderContainer>
      <JournalHeaderColumn>ACCOUNT</JournalHeaderColumn>
      <JournalHeaderColumn>DESCRIPTION</JournalHeaderColumn>
      <JournalHeaderColumn>DEBIT</JournalHeaderColumn>
      <JournalHeaderColumn>CREDIT</JournalHeaderColumn>
      <JournalHeaderColumn></JournalHeaderColumn>
    </JournalHeaderContainer>
  );
};

type Props = {
  onChange?: (entries: JournalEntry[]) => void;
  value?: JournalEntry[];
  onReset: () => void;
};

export const JournalInput = ({ onChange, value = [], onReset }: Props) => {
  const status = true;
  const { isLoading, data: result } = useQuery({
    queryKey: ["chart-of-accounts", status],
    queryFn: () =>
      accountingApiService.getChartOfAccounts({ page: 1, limit: 150, status }),
  });

  const { items = [] } = result?.data || {};

  const accountOptions = items.map(
    ({ id, name }: { id: string; name: string }) => ({
      label: name,
      value: id,
    })
  );

  const creditSum = value.reduce(
    (acc, curr) => (curr.side === "credit" ? acc + curr.amount : acc),
    0
  );

  const debitSum = value.reduce(
    (acc, curr) => (curr.side === "debit" ? acc + curr.amount : acc),
    0
  );

  const handleAddRow = useCallback(() => {
    const newRows = [
      ...value,
      { account: "", desc: "", side: "debit", amount: 0 } as JournalEntry,
    ];
    onChange?.(newRows);
  }, [value, onChange]);

  const handleRowChange = useCallback(
    (index: number, updated: Partial<JournalEntry>) => {
      const newRows = [...value];
      newRows[index] = { ...newRows[index], ...updated };
      onChange?.(newRows);
    },
    [value, onChange]
  );

  const handleRemove = useCallback(
    (indexToRemove: number) => {
      if (value.length <= 2) return;
      const updatedRows = value.filter((_, i) => i !== indexToRemove);
      onChange?.(updatedRows);
    },
    [value, onChange]
  );

  return (
    <>
      <JournalFormHeader />
      <JournalBody>
        {value.map((row, index) => (
          <JournalItem
            key={index}
            index={index}
            accountOptions={accountOptions}
            defaultValue={row}
            onChange={handleRowChange}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </JournalBody>
      <JournalFormFooter>
        <div />
        <div>Total</div>
        <div style={{ textAlign: "right" }}>{formatCurrency(debitSum)}</div>
        <div style={{ textAlign: "right" }}>{formatCurrency(creditSum)}</div>
      </JournalFormFooter>
      <JournalActionButtonContainer>
        <Button height="32px" variant="ghost" onClick={handleAddRow}>
          Add a new line
        </Button>
        <Button height="32px" variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </JournalActionButtonContainer>
    </>
  );
};
