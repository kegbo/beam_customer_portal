import Button from "@/components/utilities/Button";
import Drawer from "@/components/drawer";
import { buySellDrawerStatus } from "@/utils/atom";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { PurchaseModal } from "./PurchaseModal";
import { PreviewModal } from "./PreviewModal";
import { PurchaseStock } from "./ConfirmOTP";
import { ConfirmationModal } from "./ConfirmationModal";

const StockHeader = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  padding-right: 12px;
`;

const StockLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f8712d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const StockDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockName = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 1rem;
`;

export const StockFullName = styled.span`
  font-size: 10px;
  color: #8a8a88;
  line-height: 1rem;
`;

export const SecurityIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

// Responsive drawer content
const ResponsiveDrawerContent = styled.div`
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 0;
  }
`;

export const BuySellModal = () => {
  const [buySell, setBuySell] = useAtom(buySellDrawerStatus);
  const [step, setStep] = useState<number>(0);
  const [drawerWidth, setDrawerWidth] = useState("450px");

  // Update drawer width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setDrawerWidth("100%");
      } else if (window.innerWidth <= 768) {
        setDrawerWidth("85%");
      } else {
        setDrawerWidth("450px");
      }
    };
    
    if (typeof window !== 'undefined') {
      handleResize(); // Initial call
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const orderData = {
    customerName: "Ademola Akanji Joseph",
    stopLimit: 10000.0,
    duration: "Day Only",
    estimatedPrice: 10000.0,
    quantity: 21,
    totalAmount: 3000550,
    commission: 0.0,
  };

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully");
    setStep(3);
  };

  const handleConfirmOtp = () => {
    // setStep(3);
    toast.success("Order placed successfully");
  };

  const handleCancel = () => {
    setStep(1);
  };

  const handleContinue = () => {
    setBuySell({ isOpen: false, id: "" });
  };

  const renders: Record<number, React.ReactNode> = {
    0: <PurchaseModal setStep={setStep} />,
    1: <PreviewModal onPlaceOrder={handlePlaceOrder} orderData={orderData} />,
    // 2: <PreviewModal onPlaceOrder={handlePlaceOrder} orderData={orderData} />,
    3: <ConfirmationModal onContinue={handleContinue} />,
  };

  const title: Record<number, React.ReactNode> = {
    0: (
      <StockHeader>
        <StockInfo>
          <SecurityIcon src="./securities/bua.svg" />
          <StockDetails>
            <StockName>DUNLOP</StockName>
            <StockFullName>Dunlop United PLC</StockFullName>
          </StockDetails>
        </StockInfo>
        <Button variant="ghost-slim" height="22px" style={{ width: "45px" }}>
          View
        </Button>
      </StockHeader>
    ),
    1: "Preview Order",
    // 2: "Preview Order",
    3: "Order Processed Successfully",
  };

  return (
    <Drawer
      title={title[step]}
      isOpen={buySell.isOpen}
      onClose={() => setBuySell({ isOpen: false, id: "" })}
      width={drawerWidth}
      contentStyle={{ 
        paddingLeft: window.innerWidth <= 480 ? "0.75rem" : "1.5rem",
        paddingRight: window.innerWidth <= 480 ? "0.75rem" : "1.5rem"
      }}
      isMultiStep={step > 0}
      onBack={() => {
        if (step > 0) {
          setStep(step - 1);
        }
      }}
    >
      <ResponsiveDrawerContent>
        {renders[step]}
        {step == 2 && (
          <PurchaseStock
            onCompleted={handleConfirmOtp}
            onCancel={handleCancel}
            step={step}
          />
        )}
      </ResponsiveDrawerContent>
    </Drawer>
  );
};