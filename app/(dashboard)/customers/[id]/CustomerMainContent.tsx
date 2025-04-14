"use client";
import { QueryTab } from "@/components/utilities/query-tab";
import { Tab, Tabs } from "@/components/utilities/tab";
import { PortfolioList } from "./PortfolioList";
import { ActiveOrders } from "./ActiveOrders";
import { PendingOrders } from "./PendingOrders";
import { useParams, useSearchParams } from "next/navigation";
import { CustomerTransactions } from "./CustomerTransactions";
import styled from "styled-components";
import { useEffect, useState } from "react";

// Responsive container for the main content
const MainContentContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

// Responsive container for the tabs section
const TabsContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 5px;

  /* Hide scrollbar but allow scrolling */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  }
  
  @media (min-width: 768px) {
    margin-top: 35px;
    margin-left: 30px;
    margin-bottom: 50px;
  }
`;

export const CustomerMainContent = () => {
  const activeTab = useSearchParams().get("tab") || "Spot";
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
    <MainContentContainer>
      <TabsContainer>
        <QueryTab 
          data={["Spot", "Margin", "Transactions"]} 
          queryKey={"tab"} 
        />
      </TabsContainer>
      
      {activeTab === "Spot" && (
        <Tabs isResponsive={true}>
          <Tab label="Portfolio">
            <PortfolioList />
          </Tab>
          <Tab label="Active Orders">
            <ActiveOrders />
          </Tab>
          <Tab label="Pending Orders">
            <PendingOrders />
          </Tab>
          {/* <Tab label="Order History">
            <p>Sales Content</p>
          </Tab> */}
        </Tabs>
      )}

      {activeTab === "Margin" && (
        <div style={{ padding: isMobile ? "0 16px" : "0" }}>
          <p>Margin content here</p>
        </div>
      )}

      {activeTab === "Transactions" && (
        <div style={{ padding: isMobile ? "0 16px" : "0" }}>
          <CustomerTransactions />
        </div>
      )}
    </MainContentContainer>
  );
};