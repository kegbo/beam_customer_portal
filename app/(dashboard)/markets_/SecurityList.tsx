"use client";
import { MoreIcon, CandleIcon, ArrowDownIcon } from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Security } from "@/components/Security";
import { Column, Table } from "@/components/table";
import { tradingApiService } from "@/utils/api/services/trading.service";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ResponsiveContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

// Mobile card components
const MobileCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 0;
`;

const MobileCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  border: 1px solid #e0dfdb;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CardLabel = styled.div`
  font-size: 0.75rem;
  color: #8c8c89;
`;

const CardValue = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #0d0d0c;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  border: 1px solid #d9d8d5;
  background-color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f4f2;
  }
`;

export const SecurityList = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const columns: Column[] = [
    {
      header: "Stock Name",
      accessor: "symbol",
      render: (value) => <Security name={value} />,
      width: "200px",
    },
    { header: "Prev Price", accessor: "prevClosingPrice" },
    { header: "Daily Change (%)", accessor: "deltaChange" },
    { header: "High", accessor: "highPrice" },
    { header: "Low", accessor: "lowPrice" },
    { header: "Close", accessor: "closingPrice" },
    { header: "Change", accessor: "weightedAveragePrice" },
    {
      header: "Trades",
      accessor: "total",
      render: (_, { tradeVolume, totalValueTraded }) =>
        Number(totalValueTraded) / Number(tradeVolume) || 0,
    },
    { header: "Volume", accessor: "tradeVolume" },
    { header: "Value", accessor: "totalValueTraded" },
    {
      header: "Action",
      accessor: "action",
      render: () => (
        <SmartPopup
          defaultPosition="left"
          trigger={<MoreIcon width={24} height={24} />}
        >
          <PopupItem
            icon={<CandleIcon width={16} height={16} />}
            label="View"
            onClick={() => {}}
          />
          <PopupItem
            icon={<ArrowDownIcon width={16} height={16} />}
            label="Buy"
            onClick={() => {}}
          />
        </SmartPopup>
      ),
    },
  ];

  const { isLoading, data: result } = useQuery({
    queryKey: ["securities"],
    queryFn: () => tradingApiService.getAllEquities({ page: 1 }),
  });

  // Use mock data for demonstration
  const mockData = [
    {
      symbol: "JAIZBANK",
      prevClosingPrice: 3.60,
      deltaChange: -0.01,
      highPrice: 3.59,
      lowPrice: 3.59,
      closingPrice: 0,
      weightedAveragePrice: 3.58,
      tradeVolume: 608205,
      totalValueTraded: 2173905,
    },
    {
      symbol: "GTCO",
      prevClosingPrice: 28.55,
      deltaChange: 0.45,
      highPrice: 29.00,
      lowPrice: 28.40,
      closingPrice: 29.00,
      weightedAveragePrice: 28.75,
      tradeVolume: 2500000,
      totalValueTraded: 71875000,
    },
    {
      symbol: "AIRTELAFRI",
      prevClosingPrice: 363.00,
      deltaChange: 5.20,
      highPrice: 370.00,
      lowPrice: 362.50,
      closingPrice: 368.20,
      weightedAveragePrice: 366.85,
      tradeVolume: 120500,
      totalValueTraded: 44205425,
    }
  ];

  const formatNumber = (num: number): string => {
    if (num === undefined || num === null) return "0";
    return new Intl.NumberFormat('en-NG', {
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (isMobile) {
    return (
      <ResponsiveContainer>
        <MobileCardList>
          {mockData.map((item, index) => (
            <MobileCard key={index}>
              <CardRow>
                <CardLabel>Stock</CardLabel>
                <CardValue><Security name={item.symbol} /></CardValue>
              </CardRow>
              <CardRow>
                <CardLabel>Prev Price</CardLabel>
                <CardValue>{formatNumber(item.prevClosingPrice)}</CardValue>
              </CardRow>
              <CardRow>
                <CardLabel>Daily Change</CardLabel>
                <CardValue style={{ 
                  color: item.deltaChange >= 0 ? '#149D52' : '#D14343' 
                }}>
                  {item.deltaChange >= 0 ? '+' : ''}{formatNumber(item.deltaChange)}%
                </CardValue>
              </CardRow>
              <CardRow>
                <CardLabel>High / Low</CardLabel>
                <CardValue>
                  {formatNumber(item.highPrice)} / {formatNumber(item.lowPrice)}
                </CardValue>
              </CardRow>
              <CardRow>
                <CardLabel>Volume</CardLabel>
                <CardValue>{formatNumber(item.tradeVolume)}</CardValue>
              </CardRow>
              <ActionButtons>
                <ActionButton>View</ActionButton>
                <ActionButton>Buy</ActionButton>
              </ActionButtons>
            </MobileCard>
          ))}
        </MobileCardList>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <Table isLoading={isLoading} columns={columns} data={mockData} />
    </ResponsiveContainer>
  );
};