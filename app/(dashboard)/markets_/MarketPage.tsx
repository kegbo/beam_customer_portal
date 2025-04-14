"use client";
import { SearchInput } from "@/components/form";
import { ArrowDownIcon, CandleIcon, MoreIcon } from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Security } from "@/components/Security";
import { Column, Table } from "@/components/table";
import Button from "@/components/utilities/Button";
import { QueryTab } from "@/components/utilities/query-tab";
import {
  PageHeaderContainer,
  PageTitle,
} from "@/components/utilities/utility.component";
import { SecurityList } from "./SecurityList";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ResponsiveHeaderContainer = styled(PageHeaderContainer)`
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: auto;
  }
`;

const ResponsivePageContainer = styled.div`
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding-left: 1.813rem;
    padding-top: 2.5rem;
    padding-right: 1.813rem;
  }
`;

const TabContainer = styled.div`
  margin-top: 1rem;
  
  @media (min-width: 768px) {
    margin-top: 1.875rem;
  }
`;

export const MarketPage = ({ data }: { data: Record<string, any>[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <ResponsivePageContainer>
      <ResponsiveHeaderContainer>
        <PageTitle>Equity Market</PageTitle>
        <SearchContainer>
          <SearchInput 
            placeholder="Search by stock name" 
            variant={isMobile ? "primary" : "ghost"}
          />
        </SearchContainer>
      </ResponsiveHeaderContainer>
      <TabContainer>
        <QueryTab
          queryKey="tab"
          data={["All", "Top Gainer", "Top Losers", "Mid Cap"]}
        />
      </TabContainer>

      <SecurityList />
    </ResponsivePageContainer>
  );
};