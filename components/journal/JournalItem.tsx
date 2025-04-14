import styled from "styled-components";
import { useEffect, useState } from "react";
import { Input, Select } from "../form/elements";
import React, { memo } from "react";
import { MaterialDeleteIcon } from "../icons/material-delete";
import { CancelIcon } from "../icons/cancel";
import {
  JournalRowWrapper,
  JournalRow,
  JournalDataColumn,
} from "./JournalInput.style";

export type JournalEntry = {
  account: string;
  desc: string;
  side: "credit" | "debit";
  amount: number;
};

type Props = {
  index: number;
  defaultValue: JournalEntry;
  onChange: (index: number, updated: Partial<JournalEntry>) => void;
  onRemove: () => void;
  accountOptions: { label: string; value: string }[];
};

export const JournalItem = memo(
  ({ index, defaultValue, onChange, onRemove, accountOptions }: Props) => {
    const [focused, setFocused] = useState(false);
    const [local, setLocal] = useState<JournalEntry>(defaultValue);

    useEffect(() => {
      setLocal(defaultValue);
    }, [defaultValue]);

    const handleUpdate = (updated: Partial<JournalEntry>) => {
      let newLocal = { ...local, ...updated };

      // Enforce mutual exclusivity of debit and credit
      if (updated.side === "debit") {
        newLocal = {
          ...newLocal,
          side: "debit",
          amount: updated.amount ?? 0,
        };
      } else if (updated.side === "credit") {
        newLocal = {
          ...newLocal,
          side: "credit",
          amount: updated.amount ?? 0,
        };
      }

      setLocal(newLocal);
      onChange(index, newLocal);
    };

    return (
      <JournalRowWrapper>
        <JournalRow $focused={focused}>
          <JournalDataColumn $focused={focused}>
            <Select
              placeholder=""
              options={accountOptions}
              name="account"
              defaultValue={local.account}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(val) => handleUpdate({ account: val })}
              removeBorder={!focused}
              inputStyle={{ fontSize: "12px" }}
            />
          </JournalDataColumn>
          <JournalDataColumn $focused={focused}>
            <Input
              height="30px"
              name="desc"
              value={local.desc}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => handleUpdate({ desc: e.target.value })}
              removeBorder={!focused}
              inputStyle={{ fontSize: "12px" }}
            />
          </JournalDataColumn>
          <JournalDataColumn $focused={focused}>
            <Input
              height="30px"
              name="debit"
              value={local.side === "debit" ? local.amount.toString() : ""}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              inputStyle={{ textAlign: "right", fontSize: "12px" }}
              onChange={(e) =>
                handleUpdate({
                  amount: parseFloat(e.target.value || "0"),
                  side: "debit",
                })
              }
              removeBorder={!focused}
            />
          </JournalDataColumn>
          <JournalDataColumn $focused={focused}>
            <Input
              height="30px"
              name="credit"
              value={local.side === "credit" ? local.amount.toString() : ""}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              inputStyle={{ textAlign: "right", fontSize: "12px" }}
              onChange={(e) =>
                handleUpdate({
                  amount: parseFloat(e.target.value || "0"),
                  side: "credit",
                })
              }
              removeBorder={!focused}
            />
          </JournalDataColumn>
          <JournalDataColumn $focused={focused}>
            <button onClick={onRemove}>
              {focused ? <CancelIcon /> : <MaterialDeleteIcon />}
            </button>
          </JournalDataColumn>
        </JournalRow>
      </JournalRowWrapper>
    );
  }
);
