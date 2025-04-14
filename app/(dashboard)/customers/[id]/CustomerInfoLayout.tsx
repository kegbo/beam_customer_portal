"use client";

import styled from "styled-components";
import { CustomerAsideData } from "./CustomerAsideData";
import { CustomerMainContent } from "./CustomerMainContent";
import { useEffect, useState } from "react";

// Media query breakpoints
const breakpoints = {
  mobile: "576px",
  tablet: "768px",
  laptop: "992px",
  desktop: "1200px",
};

const CustomerInfoLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  overflow: hidden;
  padding: 0;
  
  @media (min-width: ${breakpoints.laptop}) {
    grid-template-columns: 365px 1fr;
    padding: 0 40px 0 16px;
    padding-bottom: 60px;
  }
`;

const CustomerInfoLayoutLeftContainer = styled.div`
  border-bottom: 1px solid #c8cbd9;
  height: auto;
  padding: 16px;
  
  @media (min-width: ${breakpoints.laptop}) {
    height: 100%;
    border-right: 1px solid #c8cbd9;
    padding: 0;
  }
`;

const CustomerInfoLayoutRightContainer = styled.div`
  border-bottom: 1px solid #c8cbd9;
  height: 100%;
  overflow: auto;
`;

const MobileTabToggle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9f9f7;
  margin-bottom: 20px;
  border-bottom: 1px solid #d9d8d5;
  
  @media (min-width: ${breakpoints.laptop}) {
    display: none;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  background-color: ${({ $active }) => ($active ? "#18A0FB" : "transparent")};
  border: 1px solid ${({ $active }) => ($active ? "#18A0FB" : "#d9d8d5")};
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ $active }) => ($active ? "#18A0FB" : "#f5f4f2")};
  }
`;

export const CustomerInfoLayout = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'data'>('info');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <CustomerInfoLayoutContainer>
      {isMobile && (
        <MobileTabToggle>
          <TabButton 
            $active={activeTab === 'info'} 
            onClick={() => setActiveTab('info')}
          >
            Customer Info
          </TabButton>
          <TabButton 
            $active={activeTab === 'data'} 
            onClick={() => setActiveTab('data')}
          >
            Portfolio & Orders
          </TabButton>
        </MobileTabToggle>
      )}
      
      {(!isMobile || activeTab === 'info') && (
        <CustomerInfoLayoutLeftContainer>
          <CustomerAsideData />
        </CustomerInfoLayoutLeftContainer>
      )}
      
      {(!isMobile || activeTab === 'data') && (
        <CustomerInfoLayoutRightContainer>
          <CustomerMainContent />
        </CustomerInfoLayoutRightContainer>
      )}
    </CustomerInfoLayoutContainer>
  );
};