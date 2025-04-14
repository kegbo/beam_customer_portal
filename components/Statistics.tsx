"use client";
import React from "react";
import styled from "styled-components";
import { ChevronRight } from "./icons/chevron-right";
import { ArrowUpIcon } from "./icons/arrow-up";
import { ArrowDownIcon } from "./icons/arrow-down";
import { Table, Column } from "./table";
import { useRouter } from "next/navigation";
import Button from "./utilities/Button";
import { StraightArrowUpIcon } from "./icons/straight-arrow-up";
import { StraightArrowDownIcon } from "./icons/straight-arrow-down";

// Types
type StatItem = {
  id: number;
  name: string;
  price: number;
  change: number;
};

interface StatisticsProps {
  title: string;
  to: string;
  marketType: string;
  data: any[];
}

// Styled Components
const Container = styled.div`
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const View = styled.p``;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #000;
  font-size: 0.875rem;
  cursor: pointer;
`;

const ChangeValue = styled.div<{ ispositive: string }>`
  display: flex;
  align-items: center;
  color: ${({ ispositive }) =>
    ispositive === "gainers" ? "#22C55E" : "#EF4444"};
    
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Statistics: React.FC<StatisticsProps> = ({
  title,
  to,
  marketType,
  data,
}) => {
  const router = useRouter();

  // Define columns for the Table component
  const columns: Column[] = [
    {
      header: "Stocks",
      accessor: "Symbol",
      render: (value) => (
        <StockNameContainer>
          <StockLogo
            src={`https://ui-avatars.com/api/?background=f8712d&color=fff&name=${value}&size=128`}
            alt={value}
          />
          {value}
        </StockNameContainer>
      ),
    },
    {
      header: "High",
      accessor: "Last",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      header: "Last",
      accessor: "Last",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      header: "Change",
      accessor: "PerChange",
      render: (value) => (
        <ChangeValue ispositive={marketType}>
          {marketType === "gainers" ? (
            <StraightArrowUpIcon
              style={{ marginRight: "0.25rem" }}
              stroke="#22C55E"
            />
          ) : (
            <StraightArrowDownIcon
              style={{ marginRight: "0.25rem" }}
              stroke="#EF4444"
            />
          )}
          ${Math.abs(value).toFixed(2)}
        </ChangeValue>
      ),
    },
  ];

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
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
          onClick={() => router.push(`/${to}`)}
        >
          <View>View all</View>
        </Button>
      </Header>

      <Table columns={columns} data={data} totalPages={0} />
    </Container>
  );
};

export default Statistics;