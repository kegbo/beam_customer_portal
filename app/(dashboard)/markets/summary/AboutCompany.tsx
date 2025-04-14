import React from "react";
import styled from "styled-components";
import { StraightArrowDownIcon } from "@/components/icons/straight-arrow-down";
import { StraightArrowUpIcon } from "@/components/icons/straight-arrow-up";
import { Table, Column } from "@/components/table";
import { CompanyData } from "./SummaryPage";

const Container = styled.div`
  color: #0d0d0c;
  
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;

export const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 32px;
  font-size: 14px;
  font-weight: 500;
  line-height: 131%;
  color: #595957;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 24px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
  
  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 12px;
  }
`;

export const CompanyName = styled.div`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Price = styled.div``;

export const PriceChange = styled.div<{ isNegative: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ isNegative }) => (isNegative ? "#D14343" : "#22C55E")};
`;

const AboutSection = styled.div`
  margin-bottom: 32px;
  width: 640px;
  max-width: 100%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SecurityIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0.5px;
  margin-bottom: 24px;
  color: #0d0d0c;
`;

const SecondSectionTitle = styled(SectionTitle)`
  margin-bottom: 16px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 24px;
  margin-bottom: 48px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    row-gap: 16px;
    margin-bottom: 32px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0.5px;
  color: #0d0d0c;
  margin-bottom: 8px;
  
  @media (max-width: 480px) {
    margin-bottom: 4px;
  }
`;

const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0.5px;
  color: #595957;
`;

const CompanyDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0.5px;
  color: #0d0d0c;
  margin-bottom: 24px;
  
  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #c8cbd9;
  margin: 24px 0;
`;

const NewsSection = styled.div`
  margin-top: 24px;
  margin-bottom: 64px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

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

const LightSpan = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  color: #595957;
  margin-top: 32px;
  
  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 18px;
    margin-top: 24px;
  }
`;

const HeavySpan = styled(LightSpan)`
  font-weight: 500;
  color: #0d0d0c;
`;

const TableImage = styled(SecurityIcon)`
  margin-top: 32px;
  
  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;

interface Props {
  companyData: CompanyData;
  isNegative: boolean;
}

export const AboutCompany: React.FC<Props> = ({ companyData, isNegative }) => {
  // Define columns for the news table with responsive considerations
  const newsColumns: Column[] = [
    {
      header: "Time",
      accessor: "date",
      width: "120px",
      render: (value) => <LightSpan>{value}</LightSpan>,
    },
    {
      header: "Symbol",
      accessor: "symbol",
      width: "80px",
      render: () => <TableImage src="../securities/bua.svg" />,
    },
    {
      header: "Headline",
      accessor: "headline",
      render: (value) => <HeavySpan>{value}</HeavySpan>,
    },
    {
      header: "Provider",
      accessor: "provider",
      width: "120px",
      render: (value) => <LightSpan>{value}</LightSpan>,
    },
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

      <AboutSection>
        <SectionTitle>About {companyData.name}</SectionTitle>

        <InfoGrid>
          <InfoItem>
            <InfoLabel>Sector</InfoLabel>
            <InfoValue>{companyData.sector}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Industry</InfoLabel>
            <InfoValue>{companyData.industry}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>CEO</InfoLabel>
            <InfoValue>{companyData.ceo}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Website</InfoLabel>
            <InfoValue>{companyData.website}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Headquarters</InfoLabel>
            <InfoValue>{companyData.headquarters}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Founded</InfoLabel>
            <InfoValue>{companyData.founded}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>ISIN</InfoLabel>
            <InfoValue>{companyData.isin}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>FIGI</InfoLabel>
            <InfoValue>{companyData.figi}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Employees</InfoLabel>
            <InfoValue>{companyData.employees}</InfoValue>
          </InfoItem>
        </InfoGrid>

        <CompanyDescription>{companyData.description}</CompanyDescription>
      </AboutSection>

      <Divider />

      <NewsSection>
        <SecondSectionTitle>ROYALEX NEWS</SecondSectionTitle>

        <ResponsiveTableWrapper>
          <Table columns={newsColumns} data={companyData.news} />
        </ResponsiveTableWrapper>
      </NewsSection>
    </Container>
  );
};

export default AboutCompany;