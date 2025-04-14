import { Input, Select } from "@/components/form/elements";
import Button from "@/components/utilities/Button";
import { buySellDrawerStatus } from "@/utils/atom";
import { Form, Formik } from "formik";
import { useAtom } from "jotai";
import styled from "styled-components";
import { BuySellValidationSchema } from "./validationSchema";

import { useEffect, useState } from "react";
import { SearchDropdown } from "@/components/SearchDropdown";

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

const FormLabel = styled.div`
  font-size: 12px;
  color: #3b3a39;
  margin-bottom: 6px;
`;

// Responsive price info row
const PriceInfoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  width: 100%;
  gap: 8px;
`;

// Responsive price info item
const PriceInfoItem = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
    gap: 4px;
    margin-bottom: 8px;
  }
`;

const PriceInfoLabel = styled.div`
  color: #595957;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.5px;
`;

// Responsive price info value
const PriceInfoValue = styled.div`
  padding: 8px 12px;
  background-color: #f2f2ed;
  color: #595957;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.5px;
  width: 104px;
  text-align: right;
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eeeeee;
  margin: 24px 0;
`;

// Responsive button container
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const mockCustomers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Ademola Akanji Joseph" },
  { id: "4", name: "Elizabeth Taylor" },
  { id: "5", name: "Michael Johnson" },
];

export const PurchaseModal = ({
  setStep,
}: {
  setStep: (step: number) => void;
}) => {
  const [, setBuySell] = useAtom(buySellDrawerStatus);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
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

  return (
    <Formik
      initialValues={{
        customer: "",
        side: "Buy",
        orderType: "Buy Limit",
        price: "",
        quantity: "",
        timeInForce: "Day Session",
      }}
      validationSchema={BuySellValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ values });
        setSubmitting(true);
        setStep(1);
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        isSubmitting,
        setFieldValue,
        handleSubmit,
        errors,
        values,
      }) => (
        <Form>
          <SearchDropdown
            name="customer"
            placeholder="Enter name of customer"
            items={mockCustomers}
            onChange={(selectedItem: any) => {
              setFieldValue("customer", selectedItem.id);
            }}
            error={errors.customer}
            value={values.customer}
          />

          <Select
            variant="drawer"
            name="side"
            label="Side"
            options={[
              { value: "Buy", label: "Buy" },
              { value: "Sell", label: "Sell" },
            ]}
            onChange={(value) => setFieldValue("side", value)}
            defaultValue={values.side}
          />

          <Select
            variant="drawer"
            name="orderType"
            label="Order Type"
            options={[
              { value: "Buy Limit", label: "Buy Limit" },
              { value: "Market Order", label: "Market Order" },
              { value: "Stop Order", label: "Stop Order" },
            ]}
            onChange={(value) => setFieldValue("orderType", value)}
            defaultValue={values.orderType}
          />

          <PriceInfoRow>
            <PriceInfoItem>
              <PriceInfoLabel>Ask price</PriceInfoLabel>
              <PriceInfoValue>₦35.50</PriceInfoValue>
            </PriceInfoItem>
            <PriceInfoItem>
              <PriceInfoLabel>Bid price</PriceInfoLabel>
              <PriceInfoValue>₦34.50</PriceInfoValue>
            </PriceInfoItem>
            <PriceInfoItem>
              <FormLabel>Volume</FormLabel>
              <PriceInfoValue>1,122,233</PriceInfoValue>
            </PriceInfoItem>
          </PriceInfoRow>

          <Divider />

          <PriceInfoRow>
            <PriceInfoItem>
              <PriceInfoLabel>Price</PriceInfoLabel>
              <Input
                variant="drawer"
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleChange}
                value={values.price}
                wrapperStyle={{ 
                  width: isMobile ? "100%" : "104px", 
                  height: "32px" 
                }}
              />
            </PriceInfoItem>
            <PriceInfoItem>
              <PriceInfoLabel>Quantity</PriceInfoLabel>
              <Input
                variant="drawer"
                type="text"
                placeholder="Quantity"
                name="quantity"
                onChange={handleChange}
                value={values.quantity}
                wrapperStyle={{ 
                  width: isMobile ? "100%" : "104px", 
                  height: "32px" 
                }}
              />
            </PriceInfoItem>
            <PriceInfoItem>
              <FormLabel>Amount</FormLabel>
              <PriceInfoValue>10,000</PriceInfoValue>
            </PriceInfoItem>
          </PriceInfoRow>

          <Select
            variant="drawer"
            name="timeInForce"
            label="Time in force"
            options={[
              { value: "Day Session", label: "Day Session" },
              { value: "GTC", label: "Good Till Canceled" },
              { value: "IOC", label: "Immediate or Cancel" },
            ]}
            onChange={(value) => setFieldValue("timeInForce", value)}
            defaultValue={values.timeInForce}
          />

          <ButtonContainer>
            <Button
              onClick={() => setBuySell({ isOpen: false, id: "" })}
              variant="ghost"
              fullWidth
              style={{
                flex: 1,
                width: isMobile ? "100%" : "200px",
                border: "1px solid #D9D8D5",
              }}
            >
              Back
            </Button>

            <Button
              onClick={() => setStep(1)}
              disabled={isSubmitting || Object.keys(errors).length == 0}
              isLoading={isSubmitting}
              style={{ 
                flex: 1, 
                width: isMobile ? "100%" : "200px" 
              }}
              variant="yellow"
              fullWidth
            >
              Place order
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </Formik>
  );
};