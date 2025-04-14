import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CompanyHeader,
  PriceChange,
  Price,
  CompanyName,
  CompanyInfo,
  SecurityIcon,
} from "./AboutCompany";
import { CompanyData } from "./SummaryPage";

const Container = styled.div`
  color: #0d0d0c;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FinancialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
  margin-top: 48px;
  
  @media (max-width: 1024px) {
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (max-width: 480px) {
    margin-top: 32px;
    gap: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
  width: 443px;
  max-width: 100%;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  color: #0d0d0c;
  
  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const MetricsTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
  
  @media (max-width: 480px) {
    padding: 8px 0;
  }
`;

const MetricLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  color: ##0d0d0c;
  
  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 18px;
  }
`;

const MetricValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 23px;
  color: ##0d0d0c;
  text-align: right;
  min-width: 80px;
  
  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 18px;
    min-width: 70px;
  }
`;

const SubsectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  line-height: 23px;
  margin: 40px 0 16px;
  color: #0d0d0c;
  
  @media (max-width: 768px) {
    margin: 32px 0 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin: 24px 0 12px;
  }
`;

// Helper function to format metric values in the future
const formatValue = (value: string | number) => {
  // Currently just returning the value, but you could add formatting logic here
  return value;
};

interface Props {
  companyData: CompanyData;
  isNegative: boolean;
}

export const Financials: React.FC<Props> = ({ companyData, isNegative }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Mock data for financial metrics
  const valuationMetrics = [
    { label: "Market Capitalization", value: "3.67B" },
    { label: "Enterprise Value (MRQ)", value: "3.67B" },
    { label: "Enterprise Value/EBITDA (TTM)", value: "3.67B" },
    { label: "Total Shares Outstanding", value: "3.67B" },
    { label: "Number of Shareholders", value: "3.67B" },
    { label: "Price to Earnings Ratio (TTM)", value: "3.67B" },
    { label: "Price to Revenue Ratio (TTM)", value: "3.67B" },
    { label: "Price to Book (FY)", value: "3.67B" },
    { label: "Price to Sales (FY)", value: "3.67B" },
  ];

  const priceHistoryMetrics = [
    { label: "Average Volume (10 day)", value: "3.67B" },
    { label: "1-Year Beta", value: "3.67B" },
    { label: "52 Week High", value: "3.67B" },
    { label: "52 Week Low", value: "3.67B" },
  ];

  const incomeStatementMetrics = [
    { label: "Basic EPS (FY)", value: "3.67B" },
    { label: "Basic EPS (TTM)", value: "3.67B" },
    { label: "EPS Diluted (FY)", value: "3.67B" },
    { label: "Net Income (FY)", value: "3.67B" },
    { label: "EBITDA (TTM)", value: "3.67B" },
    { label: "Gross Profit (MRQ)", value: "3.67B" },
    { label: "Gross Profit (FY)", value: "3.67B" },
    { label: "Last Year Revenue (FY)", value: "3.67B" },
    { label: "Total Revenue (FY)", value: "3.67B" },
  ];

  const operatingMetrics = [
    { label: "Return on Assets (TTM)", value: "3.67B" },
    { label: "Return on Equity (TTM)", value: "3.67B" },
    { label: "Return on Invested Capital (TTM)", value: "3.67B" },
    { label: "Revenue per Employee (FY)", value: "3.67B" },
  ];

  const dividendsMetrics = [
    { label: "Dividends Paid (FY)", value: "3.67B" },
    { label: "Dividend Yield Forward", value: "3.67B" },
    { label: "Dividends per Share (FY)", value: "3.67B" },
  ];

  return (
    <Container>
      <CompanyHeader>
        <SecurityIcon src="../securities/bua.svg" />
        <CompanyInfo>
          <CompanyName>{companyData.name}</CompanyName>
          <Price>{companyData.price} NGN</Price>
          <PriceChange isNegative={isNegative}>
            {companyData.priceChange} {companyData.percentChange}%
          </PriceChange>
        </CompanyInfo>
      </CompanyHeader>
      <FinancialsGrid>
        {/* Left Column */}
        <Section>
          <SectionTitle>Valuation</SectionTitle>
          <MetricsTable>
            {valuationMetrics.map((metric, index) => (
              <MetricRow key={index}>
                <MetricLabel>{metric.label}</MetricLabel>
                <MetricValue>{formatValue(metric.value)}</MetricValue>
              </MetricRow>
            ))}
          </MetricsTable>

          <SubsectionTitle>Operating metrics</SubsectionTitle>
          <MetricsTable>
            {operatingMetrics.map((metric, index) => (
              <MetricRow key={index}>
                <MetricLabel>{metric.label}</MetricLabel>
                <MetricValue>{formatValue(metric.value)}</MetricValue>
              </MetricRow>
            ))}
          </MetricsTable>

          <SubsectionTitle>Dividends</SubsectionTitle>
          <MetricsTable>
            {dividendsMetrics.map((metric, index) => (
              <MetricRow key={index}>
                <MetricLabel>{metric.label}</MetricLabel>
                <MetricValue>{formatValue(metric.value)}</MetricValue>
              </MetricRow>
            ))}
          </MetricsTable>
        </Section>

        {/* Right Column - Rendered below on mobile */}
        <Section>
          <SectionTitle>Price History</SectionTitle>
          <MetricsTable>
            {priceHistoryMetrics.map((metric, index) => (
              <MetricRow key={index}>
                <MetricLabel>{metric.label}</MetricLabel>
                <MetricValue>{formatValue(metric.value)}</MetricValue>
              </MetricRow>
            ))}
          </MetricsTable>

          <SubsectionTitle>Income Statement</SubsectionTitle>
          <MetricsTable>
            {incomeStatementMetrics.map((metric, index) => (
              <MetricRow key={index}>
                <MetricLabel>{metric.label}</MetricLabel>
                <MetricValue>{formatValue(metric.value)}</MetricValue>
              </MetricRow>
            ))}
          </MetricsTable>
        </Section>
      </FinancialsGrid>
    </Container>
  );
};

export default Financials;