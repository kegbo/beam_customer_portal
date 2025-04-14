import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@/components/utilities/Button";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 398px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e6e6e6;
  height: 98px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    height: auto;
    padding-bottom: 1rem;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 56px;
`;

const OrderTypeLabel = styled.div`
  font-size: 10px;
  color: #8a8a88;
  margin-bottom: 4px;
`;

const OrderTypeValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #149d52;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  align-items: center;
  margin-bottom: 8px;
  
  @media (max-width: 480px) {
    height: auto;
    min-height: 24px;
  }
`;

const DetailLabel = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  line-spacing: 0.5px;
  color: #595957;
`;

const DetailValue = styled.div`
  font-size: 12px;
  font-weight: 500;
  text-align: right;
  color: #0d0d0c;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TotalLabel = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #0c110d;
`;

const TotalValue = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #0c110d;
`;

const ActionButton = styled.div`
  margin-top: 6.5rem;
  margin-bottom: 2.5rem;
  width: 100%;
  
  @media (max-width: 480px) {
    margin-top: 3rem;
  }
`;

const Body = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 188px;
  
  @media (max-width: 480px) {
    height: auto;
    min-height: 188px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eeeeee;
  margin: 12px 0;
`;

const PreviewStockName = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

const PreviewStockFullName = styled.span`
  font-size: 12px;
  color: #8a8a88;
`;

export const StockDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewSecurityIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

interface PreviewModalProps {
  onPlaceOrder: () => void;
  orderData: {
    customerName: string;
    stopLimit: number;
    duration: string;
    estimatedPrice: number;
    quantity: number;
    totalAmount: number;
    commission: number;
  };
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  onPlaceOrder,
  orderData,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const {
    customerName,
    stopLimit,
    duration,
    estimatedPrice,
    quantity,
    totalAmount,
    commission,
  } = orderData;

  return (
    <PreviewContainer>
      <Header>
        <HeaderLeft>
          <PreviewSecurityIcon src="./securities/bua.svg" alt="Dunlop logo" />
          <StockDetails>
            <PreviewStockName>DUNLOP</PreviewStockName>
            <PreviewStockFullName>Dunlop United PLC</PreviewStockFullName>
          </StockDetails>
        </HeaderLeft>
        <HeaderRight>
          <OrderTypeLabel>ORDER TYPE</OrderTypeLabel>
          <OrderTypeValue>BUY</OrderTypeValue>
        </HeaderRight>
      </Header>

      <Body>
        <DetailRow>
          <DetailLabel>Customer's name</DetailLabel>
          <DetailValue>{customerName}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Stop/Limit</DetailLabel>
          <DetailValue>₦{stopLimit.toLocaleString()}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Duration</DetailLabel>
          <DetailValue>{duration}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Estimated Price</DetailLabel>
          <DetailValue>₦{estimatedPrice.toLocaleString()}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Quantity</DetailLabel>
          <DetailValue>{quantity} shares</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Estimated Price</DetailLabel>
          <DetailValue>₦{totalAmount.toLocaleString()}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>Commission</DetailLabel>
          <DetailValue>₦{commission.toLocaleString()}</DetailValue>
        </DetailRow>
      </Body>

      <Divider />

      <TotalRow>
        <TotalLabel>Estimated Total</TotalLabel>
        <TotalValue>₦{totalAmount.toLocaleString()}</TotalValue>
      </TotalRow>

      <ActionButton>
        <Button
          onClick={onPlaceOrder}
          variant="yellow"
          style={{ width: "100%" }}
        >
          <span style={{ fontSize: "14px", fontWeight: "600" }}>
            Place order
          </span>
        </Button>
      </ActionButton>
    </PreviewContainer>
  );
};