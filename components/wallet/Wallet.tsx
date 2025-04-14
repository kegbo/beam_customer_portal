import styled from "styled-components";
import { BankIcon } from "../icons/bank";
import { CopyIcon } from "../icons/copy";
import { copyToClipboard } from "@/lib/helper";
import { CopyButton } from "../utilities/utility.component";
import React, { useState } from "react";
import { FundWallet } from "./funding/FundWallet";
import { addCustomerFundModal } from "@/utils/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { paymentApiService } from "@/utils/api/services/payment.service";
import { useParams } from "next/navigation";
import { formatCurrency, getStringParam } from "@/utils/helper";

const WalletContainer = styled.div`
  width: 100%;
  max-width: 364px;
  min-height: 207px;
  background-color: #f9f9f7;
  padding: 20px;
  margin: 0 auto;
  
  @media (min-width: 576px) {
    padding: 24px;
    margin: 0;
  }
`;

const WalletTitle = styled.p`
  font-size: 0.75rem;
  line-height: 18px;
  font-weight: 400;
  color: #0d0d0c;
`;

const AmountWrapper = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 32px;
  margin-top: 14px;
  min-height: 60px;
  
  @media (min-width: 576px) {
    font-size: 1.5rem;
    line-height: 36px;
  }
`;

const IntegerPart = styled.span`
  color: #0c110d;
`;

const DecimalPart = styled.span`
  color: #d1d1e0;
`;

const WalletFooter = styled.div`
  border-top: 1px solid #8c8c89;
  display: flex;
  align-items: center;
  padding-top: 14px;
  font-size: 10px;
  gap: 10px;
  padding-left: 8px;
  
  @media (min-width: 576px) {
    font-size: 12px;
    gap: 23px;
    padding-left: 20px;
  }
`;

const WalletButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  height: auto;
  margin-bottom: 10px;
  
  @media (min-width: 576px) {
    flex-wrap: nowrap;
    height: 26px;
  }
`;

const WalletCTA = styled.button`
  min-width: 70px;
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #d9d8d5;
  border-radius: 5px;
  height: 25px;
  font-size: 10px;
  justify-content: center;
  color: #8c8c89;
  
  @media (min-width: 576px) {
    min-width: 80px;
    flex: 0 1 auto;
    font-size: 11px;
  }
`;

const AccountNumber = styled.p`
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (min-width: 576px) {
    font-size: 12px;
  }
`;

interface WalletProps {
  addFund?: () => void;
  widthdraw?: () => void;
  activatePnd?: () => void;
  hideCTA?: boolean;
}

export const Wallet: React.FC<WalletProps> = ({
  widthdraw,
  activatePnd,
  hideCTA,
}) => {
  const setOpenAddFund = useSetAtom(addCustomerFundModal);

  const params = useParams();
  const customerId = getStringParam(params.id);

  const { isLoading, data: result } = useQuery({
    queryKey: ["wallet", customerId],
    queryFn: () => paymentApiService.getCustomerBalance(customerId!),
  });

  const data = result?.data || {};

  const [integer, decimal] = formatCurrency(data?.balance).split(".");

  return (
    <>
      <WalletContainer>
        <WalletTitle>Wallet Balance</WalletTitle>
        <AmountWrapper>
          <IntegerPart>{integer}</IntegerPart>
          <DecimalPart>.{decimal}</DecimalPart>
        </AmountWrapper>
        {!hideCTA && (
          <WalletButtonGroup>
            <WalletCTA onClick={() => setOpenAddFund(true)}>
              Add Funds
            </WalletCTA>
            <WalletCTA onClick={widthdraw}>Withdrawal</WalletCTA>
            <WalletCTA onClick={activatePnd}>Activate PND</WalletCTA>
          </WalletButtonGroup>
        )}
        <WalletFooter>
          <BankIcon width={18} height={18} />
          <AccountNumber>Wema Bank 013070150780</AccountNumber>
          <CopyButton onClick={() => copyToClipboard("013070150780")}>
            <CopyIcon width={16} height={16} />
          </CopyButton>
        </WalletFooter>
      </WalletContainer>
      <FundWallet />
    </>
  );
};