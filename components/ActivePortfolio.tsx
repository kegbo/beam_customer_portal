"use client";
import React from "react";
import styled from "styled-components";
import { ChevronRight } from "./icons/chevron-right";
import { ArrowUpIcon } from "./icons/arrow-up";
import Button from "./utilities/Button";
import { useRouter } from "next/navigation";
import { Table, Column } from "./table";
import { StraightArrowUpIcon } from "./icons/straight-arrow-up";
// Types
interface StockItem {
  name: string;
  logo: string;
  price: number;
  priceChange: number;
  changePercent: number;
  high: number;
  low: number;
}

// Define the type for the time ranges
type TimeRange = "3 years" | "12 months" | "6 months" | "30 days" | "7 days";

// Styled Components
const Container = styled.div`
  margin-top: 4.5rem;
  
  @media (max-width: 768px) {
    margin-top: 2.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StockLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
  border-radius: 100%;
  
  @media (max-width: 768px) {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const StockNameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 10rem;
  
  @media (max-width: 768px) {
    width: auto;
    max-width: 8rem;
    font-size: 0.75rem;
  }
`;

const ChangeValue = styled.div<{ ispositive: string }>`
  display: flex;
  align-items: center;
  color: ${({ ispositive }) => (ispositive === "true" ? "#22C55E" : "#EF4444")};
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ActionButton = styled(Button)`
  min-width: 4rem;
  
  @media (max-width: 768px) {
    min-width: 3rem;
    height: 24px !important;
    font-size: 0.625rem !important;
    padding: 0 0.5rem !important;
  }
`;

const ActivePortfolio: React.FC = () => {
  const router = useRouter();

  // Mock data for demonstration
  const mockStocks = [
    {
      stockName: "DUNLOP NGN",
      logo: "https://ui-avatars.com/api/?background=f8712d&color=fff&name=DN&size=128",
      price: 250.0,
      priceChange: 250.0,
      changePercent: 23.15,
      high: 250.0,
      low: 250.0,
    },
    {
      stockName: "DUNLOP NGN",
      logo: "https://ui-avatars.com/api/?background=ffcd00&color=fff&name=DN&size=128",
      price: 250.0,
      priceChange: 250.0,
      changePercent: 23.15,
      high: 250.0,
      low: 250.0,
    },
    {
      stockName: "DUNLOP NGN",
      logo: "https://ui-avatars.com/api/?background=ff8c41&color=fff&name=DN&size=128",
      price: 250.0,
      priceChange: 250.0,
      changePercent: 23.15,
      high: 250.0,
      low: 250.0,
    },
  ];

  // Define columns for the Table component
  const columns: Column[] = [
    {
      header: "Stocks Name",
      accessor: "stockName",
      render: (value, row) => (
        <StockNameContainer>
          <StockLogo src={row.logo} alt={value} />
          {value}
        </StockNameContainer>
      ),
    },
    {
      header: "Price (₦)",
      accessor: "price",
      render: (value) => `₦${value.toFixed(2)}`,
    },
    {
      header: "Price change(₦)",
      accessor: "priceChange",
      render: (value) => `₦${value.toFixed(2)}`,
    },
    {
      header: "Change (%)",
      accessor: "changePercent",
      render: (value) => (
        <ChangeValue ispositive={value > 0 ? "true" : "false"}>
          <StraightArrowUpIcon
            style={{ marginRight: "0.25rem" }}
            stroke="#22C55E"
          />
          {value.toFixed(2)}%
        </ChangeValue>
      ),
    },
    {
      header: "High (₦)",
      accessor: "high",
      render: (value) => `₦${value.toFixed(2)}`,
    },
    {
      header: "Low (₦)",
      accessor: "low",
      render: (value) => `₦${value.toFixed(2)}`,
    },
    {
      header: "Actions",
      accessor: "actions",
      render: () => (
        <ActionButton
          variant="ghost"
          height="28px"
          radius="4px"
          style={{
            border: "1px solid #D9D8D5",
            fontSize: "0.75rem",
          }}
        >
          Buy
        </ActionButton>
      ),
    },
  ];

  return (
    <Container>
      <Header>
        <Title>Active Portfolio</Title>
        <Button
          variant="ghost"
          height="28px"
          radius="4px"
          iconPosition="right"
          icon={<ChevronRight width={16} height={20} />}
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #D9D8D5",
            fontSize: "0.75rem",
          }}
          onClick={() => router.push("/portfolio")}
        >
          View all
        </Button>
      </Header>

      <Table columns={columns} data={mockStocks} />
    </Container>
  );
};

export default ActivePortfolio;