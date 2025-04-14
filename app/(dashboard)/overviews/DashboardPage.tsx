"use client";

import React from "react";
import styled from "styled-components";
import AreaChart from "@/components/charts/AreaChart";
import DashboardCard from "@/components/DashboardCard";
import Statistics from "@/components/Statistics";
import ActivePortfolio from "@/components/ActivePortfolio";
import { overviewTabAtom } from "@/utils/atom";
import { useAtom } from "jotai";

// Styled Components

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 428px;
  height: 100%;
  padding: 0px;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 350px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;

const LeftColumn = styled.div`
  margin: 0rem 2.5rem 0 2.5rem;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 2rem;
  scroll-behavior: smooth;
  
  @media (max-width: 992px) {
    margin: 0rem 1rem;
    padding-bottom: 1rem;
    overflow-y: visible;
    height: auto;
  }
`;

const RightColumn = styled.div`
  background-color: #fafafa;
  height: 100%;
  overflow: auto;
  padding-bottom: 2rem;
  scroll-behavior: smooth;
  
  @media (max-width: 992px) {
    padding-top: 1rem;
    border-top: 1px solid #e0dfdb;
    padding-bottom: 1rem;
    overflow: visible;
    height: auto;
  }
`;

const RightColumnTopSpacer = styled.div`
  height: 92px;
  border-bottom: 0.125px solid #e0dfdb;

  @media (min-width: 1536px) {
    height: 96px;
  }
  
  @media (max-width: 992px) {
    height: 60px;
  }
`;

const StatisticsContainer = styled.div`
  width: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 500px;
    padding: 0 1rem;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #8a8a88;
`;

const LegendDot = styled.div<{ color: string }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const PageTitle = styled.p`
  height: 92px;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    height: 60px;
    font-size: 1.25rem;
  }
`;

const CardRow = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 0.125px solid #d9d8d5;
  height: 92px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    border-bottom: none;
  }
`;

const CardWithBorder = styled(DashboardCard)`
  padding-right: 2.5rem;
  border-right: 0.125px solid #d9d8d5;
  
  @media (max-width: 768px) {
    padding-right: 0;
    border-right: none;
    border-bottom: 0.125px solid #d9d8d5;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

const CardWithBorderLeft = styled(CardWithBorder)`
  padding-left: 1.5rem;
  
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const DashboardCardLeft = styled(DashboardCard)`
  padding-left: 1.5rem;
  
  @media (max-width: 768px) {
    padding-left: 0;
    padding-bottom: 1rem;
    border-bottom: 0.125px solid #d9d8d5;
    margin-bottom: 1rem;
  }
`;

const ChartContainer = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.125px solid #e0dfdb;
  
  @media (max-width: 768px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const SpotTrading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.125rem;
  color: #8a8a88;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const DashboardPage: React.FC<{
  gainers: any[];
  losers: any[];
}> = ({ gainers, losers }) => {
  const [activeTab] = useAtom(overviewTabAtom);

  // Dummy data for demonstration
  const customerData = { data: { total: 12345 } };
  const metricsData = {
    data: {
      totalOrder: 98765432,
      totalPortfolio: 54321678,
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <>
            <PageTitle>{activeTab}</PageTitle>
            <CardRow>
              <CardWithBorder
                title="Total Customers"
                stats={customerData?.data?.total || "0"}
                gain="45,657 ₦"
                loss="45,657 ₦"
              />
              <CardWithBorderLeft
                title="Total Value Traded (YTD)"
                stats={`₦ ${
                  metricsData?.data?.totalOrder?.toLocaleString() || "0"
                }`}
                gain="45,657 ₦"
                loss="45,657 ₦"
              />
              <DashboardCardLeft
                title="Total Active Portfolio"
                stats={`₦ ${
                  metricsData?.data?.totalPortfolio?.toLocaleString() || "0"
                }`}
                gain="45,657 ₦"
                loss="45,657 ₦"
              />
            </CardRow>

            <ChartContainer>
              <AreaChart />
              <LegendContainer>
                <LegendItem>
                  <LegendDot color="#4CAF50" />
                  Customer
                </LegendItem>
                <LegendItem>
                  <LegendDot color="#F9D94F" />
                  Asset
                </LegendItem>
              </LegendContainer>
            </ChartContainer>

            <ActivePortfolio />
          </>
        );
      case "Spot":
        return <SpotTrading>Under Construction</SpotTrading>;
      case "Margin":
        return <SpotTrading>Under Construction</SpotTrading>;
      default:
        return null;
    }
  };

  return (
    <MainContent>
      <LeftColumn>{renderContent()}</LeftColumn>

      <RightColumn>
        <RightColumnTopSpacer />
        <StatisticsContainer>
          <Statistics
            title="Top Gainers"
            to="markets/gainers"
            marketType="gainers"
            data={gainers}
          />
          <Statistics
            title="Top Losers"
            to="markets/losers"
            marketType="losers"
            data={losers}
          />
        </StatisticsContainer>
        <RightColumnTopSpacer />
      </RightColumn>
    </MainContent>
  );
};

export default DashboardPage;