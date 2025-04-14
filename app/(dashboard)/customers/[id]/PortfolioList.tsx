import { MoreIcon, ChartIcon, UserTickIcon } from "@/components/icons";
import SmartPopup, { PopupItem } from "@/components/Popup";
import { Column, Table } from "@/components/table";
import router from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ResponsiveTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 0 10px;
  
  @media (min-width: 768px) {
    padding: 0;
  }
`;

// Styled for mobile card view
const MobileCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
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
`;

const SymbolWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SymbolLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #18A0FB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
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

export const PortfolioList = () => {
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
      header: "Symbol",
      accessor: "symbol",
    },
    { header: "Quantity", accessor: "quantity" },
    { header: "Initial Value", accessor: "initialValue" },
    { header: "Current Value", accessor: "currentValue" },
    {
      header: "Action",
      accessor: "action",
      render: (_, { id }) => (
        <SmartPopup trigger={<MoreIcon width={24} height={24} />}>
          <PopupItem
            icon={<ChartIcon width={16} height={16} />}
            label="View Profile"
            onClick={() => {
              router.push(`/customers/${id}`);
            }}
          />
          <PopupItem
            icon={<UserTickIcon width={16} height={16} />}
            label="Assign to"
            onClick={() => {}}
          />
        </SmartPopup>
      ),
    },
  ];

  // Mock data for demonstration
  const mockData = [
    { 
      id: '1', 
      symbol: 'AAPL', 
      quantity: 10, 
      initialValue: 1500, 
      currentValue: 1700 
    },
    { 
      id: '2', 
      symbol: 'MSFT', 
      quantity: 5, 
      initialValue: 1200, 
      currentValue: 1350 
    },
    { 
      id: '3', 
      symbol: 'GOOGL', 
      quantity: 3, 
      initialValue: 2500, 
      currentValue: 2650 
    }
  ];

  if (isMobile) {
    return (
      <MobileCardList>
        {mockData.map((item) => (
          <MobileCard key={item.id}>
            <CardRow>
              <CardLabel>Symbol</CardLabel>
              <CardValue>
                <SymbolWrapper>
                  <SymbolLogo>{item.symbol.charAt(0)}</SymbolLogo>
                  {item.symbol}
                </SymbolWrapper>
              </CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Quantity</CardLabel>
              <CardValue>{item.quantity}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Initial Value</CardLabel>
              <CardValue>${item.initialValue.toLocaleString()}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Current Value</CardLabel>
              <CardValue>${item.currentValue.toLocaleString()}</CardValue>
            </CardRow>
            <ActionButtons>
              <ActionButton>View</ActionButton>
              <ActionButton>Trade</ActionButton>
            </ActionButtons>
          </MobileCard>
        ))}
      </MobileCardList>
    );
  }

  return (
    <ResponsiveTableContainer>
      <Table columns={columns} data={mockData} />
    </ResponsiveTableContainer>
  );
};