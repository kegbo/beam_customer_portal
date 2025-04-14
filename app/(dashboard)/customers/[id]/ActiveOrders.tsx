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

const StatusBadge = styled.span<{ $status?: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $status }) => 
    $status === 'active' ? '#E4F5EE' : 
    $status === 'pending' ? '#FFF8E0' : 
    '#F5F4F2'};
  color: ${({ $status }) => 
    $status === 'active' ? '#149D52' : 
    $status === 'pending' ? '#FFA800' : 
    '#8C8C89'};
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

export const ActiveOrders = () => {
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
      header: "Order ID",
      accessor: "id",
    },
    { header: "Stock", accessor: "stock" },
    { header: "QTY", accessor: "qty" },
    { header: "Type", accessor: "type" },
    { header: "Status", accessor: "status" },
    { header: "Date", accessor: "createdAt" },
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
      id: 'ORD-12345', 
      stock: 'AAPL', 
      qty: 10, 
      type: 'Buy',
      status: 'active', 
      createdAt: '2025-04-10' 
    },
    { 
      id: 'ORD-12346', 
      stock: 'MSFT', 
      qty: 5, 
      type: 'Sell',
      status: 'active', 
      createdAt: '2025-04-12' 
    },
    { 
      id: 'ORD-12347', 
      stock: 'GOOGL', 
      qty: 3, 
      type: 'Buy',
      status: 'active', 
      createdAt: '2025-04-13' 
    }
  ];

  if (isMobile) {
    return (
      <MobileCardList>
        {mockData.map((item) => (
          <MobileCard key={item.id}>
            <CardRow>
              <CardLabel>Order ID</CardLabel>
              <CardValue>{item.id}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Stock</CardLabel>
              <CardValue>{item.stock}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>QTY</CardLabel>
              <CardValue>{item.qty}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Type</CardLabel>
              <CardValue>{item.type}</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Status</CardLabel>
              <CardValue>
                <StatusBadge $status={item.status}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </StatusBadge>
              </CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Date</CardLabel>
              <CardValue>{item.createdAt}</CardValue>
            </CardRow>
            <ActionButtons>
              <ActionButton>View</ActionButton>
              <ActionButton>Edit</ActionButton>
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