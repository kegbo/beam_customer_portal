"use client";
import { QueryTab } from "@/components/utilities/query-tab";
import {
  PageHeaderContainer,
  PageTitle,
} from "@/components/utilities/utility.component";
import { useSearchParams } from "next/navigation";
import AboutCompany from "./AboutCompany";
import Financials from "./Financials";
import { SearchInput } from "@/components/form/elements";
import styled from "styled-components";

// Responsive container for the page
const ResponsiveContainer = styled.div`
  padding-left: 1.813rem;
  padding-top: 2.5rem;
  padding-right: 1.813rem;
  
  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1rem;
  }
`;

// Responsive header container
const ResponsiveHeaderContainer = styled(PageHeaderContainer)`
  flex-direction: row;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

// Responsive search input wrapper
const SearchInputWrapper = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Responsive tab container
const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.875rem;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
`;

// Content wrapper for the tab content
const ContentWrapper = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;

export interface CompanyData {
  name: string;
  ticker: string;
  price: number;
  priceChange: number;
  percentChange: number;
  sector: string;
  industry: string;
  ceo: string;
  website: string;
  headquarters: string;
  founded: string;
  isin: string;
  figi: string;
  employees: number;
  description: string;
  news: Array<{
    date: string;
    headline: string;
    provider: string;
  }>;
}

export const SummaryPage = () => {
  const tab = useSearchParams().get("tab");

  const companyData: CompanyData = {
    name: "ROYAL EXCHANGE PLC",
    ticker: "ROYX",
    price: 1.01,
    priceChange: -0.01,
    percentChange: -0.9,
    sector: "Finance",
    industry: "Multi-Line Insurance",
    ceo: "Hewett Adegboyega Benson",
    website: "royalexchangeplc.com",
    headquarters: "Lagos",
    founded: "1918",
    isin: "NGROYALEX007",
    figi: "BBG000CLHDL9",
    employees: 22,
    description:
      "Royal Exchange Plc engages in the provision of financing, asset management, and trusteeship services. It operates through the following segments: Life Insurance, Healthcare, and Credit Financing. The company was founded in 1918 and is headquartered in Lagos, Nigeria.",
    news: [
      {
        date: "January 28, 2025",
        headline:
          "Royal exchange sees Q1 PBT and Exceptional income of 48.4 Mln Naira",
        provider: "Nairametrics",
      },
      {
        date: "January 28, 2025",
        headline:
          "Royal exchange sees Q1 PBT and Exceptional income of 48.4 Mln Naira",
        provider: "Nairametrics",
      },
      {
        date: "January 28, 2025",
        headline:
          "Royal exchange sees Q1 PBT and Exceptional income of 48.4 Mln Naira",
        provider: "Nairametrics",
      },
      {
        date: "January 28, 2025",
        headline:
          "Royal exchange sees Q1 PBT and Exceptional income of 48.4 Mln Naira",
        provider: "Nairametrics",
      },
    ],
  };

  const isNegative = companyData.priceChange < 0;
  return (
    <ResponsiveContainer>
      <ResponsiveHeaderContainer>
        <PageTitle>Market Summary</PageTitle>
        <SearchInputWrapper>
          <SearchInput placeholder="Search by stock name" />
        </SearchInputWrapper>
      </ResponsiveHeaderContainer>
      
      <TabContainer>
        <QueryTab
          queryKey="tab"
          data={["Chart", "About Company", "Financials"]}
        />
      </TabContainer>

      <ContentWrapper>
        {(!tab || tab === "About Company") && (
          <AboutCompany companyData={companyData} isNegative={isNegative} />
        )}
        {tab == "Financials" && (
          <Financials companyData={companyData} isNegative={isNegative} />
        )}
      </ContentWrapper>
    </ResponsiveContainer>
  );
};