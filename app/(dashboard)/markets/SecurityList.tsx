"use client";
import {
  MoreIcon,
  CandleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Security } from "@/components/Security";
import { Column, Table } from "@/components/table";
import { tradingApiService } from "@/utils/api/services/trading.service";
import { useQuery } from "@tanstack/react-query";
import { BuySellModal } from "./BuySellModal";
import { buySellDrawerStatus } from "@/utils/atom";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useEffect, useState } from "react";

// Responsive wrapper for the table
const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d9d8d5;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a6a5a2;
  }
`;

export const SecurityList = ({ data }: { data: any }) => {
  const setBuySell = useSetAtom(buySellDrawerStatus);
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Track window size for responsive column adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Dynamically adjust columns based on screen size
  const getResponsiveColumns = (): Column[] => {
    const baseColumns: Column[] = [
      {
        header: "Stock Name",
        accessor: "symbol",
        render: (value) => <Security name={value} />,
        width: "200px",
      },
      { 
        header: "Prev Price", 
        accessor: "prevClosingPrice",
      },
    ];
    
    // Add more columns for larger screens
    if (windowWidth > 480) {
      baseColumns.push(
        { header: "Daily Change (%)", accessor: "balance" },
        { header: "High", accessor: "highPrice" },
        { header: "Low", accessor: "lowPrice" }
      );
    }
    
    // Add even more columns for medium and larger screens
    if (windowWidth > 768) {
      baseColumns.push(
        { header: "Close", accessor: "closingPrice" },
        { header: "Change", accessor: "weightedAveragePrice" }
      );
    }
    
    // Add all columns for large screens
    if (windowWidth > 1024) {
      baseColumns.push(
        {
          header: "Trades",
          accessor: "total",
          render: (_, { tradeVolume, totalValueTraded }) =>
            Number(totalValueTraded) / Number(tradeVolume),
        },
        { header: "Volume", accessor: "tradeVolume" },
        { header: "Value", accessor: "totalValueTraded" }
      );
    }
    
    // Always include the action column
    baseColumns.push({
      header: "Action",
      accessor: "action",
      render: (_, { id }) => (
        <SmartPopup
          defaultPosition={windowWidth < 768 ? "bottom" : "left"}
          trigger={<MoreIcon width={24} height={24} />}
        >
          <PopupItem
            icon={<CandleIcon width={16} height={16} />}
            label="View"
            onClick={() => {
              router.push(`/markets/summary`);
            }}
          />
          <PopupItem
            icon={<ArrowDownIcon width={16} height={16} />}
            label="Buy"
            onClick={() => {
              setBuySell({ isOpen: true, id });
            }}
          />
          <PopupItem
            icon={<ArrowUpIcon width={16} height={16} />}
            label="Sell"
            onClick={() => {
              setBuySell({ isOpen: true, id });
            }}
          />
        </SmartPopup>
      ),
    });
    
    return baseColumns;
  };

  const { isLoading, data: result } = useQuery({
    queryKey: ["securities"],
    queryFn: () => tradingApiService.getAllEquities({ page: 1 }),
  });

  const columns = getResponsiveColumns();

  return (
    <ResponsiveTableWrapper>
      <Table isLoading={isLoading} columns={columns} data={data} />
    </ResponsiveTableWrapper>
  );
};