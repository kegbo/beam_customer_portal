"use client";
import { paymentApiService } from "@/utils/api/services/payment.service";
import { formatCurrency } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

const MetricWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-bottom: 0.031rem solid #d9d8d5;
  list-style-type: none;
  margin-top: 30px;
`;

const MetricItem = styled.li`
  height: 74px;
  margin-bottom: 0.797rem;

  border-left: 0.031rem solid #d9d8d5;
  padding-left: 30px;
  padding-right: 48px;

  &:first-child {
    border: none;
    padding-left: 0;
  }
`;

const MetricItemTitle = styled.p`
  font-size: 0.75rem;
  color: #8c8c89;
`;

const MetricValue = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 6px;
`;

export const TransactionMetric = ({
  averageTransactionValue = 0,
  totalProfitAndLoss = 0,
  pendingTransaction = 0,
}: {
  averageTransactionValue?: number;
  totalProfitAndLoss?: number;
  pendingTransaction?: number;
}) => {
  const page = useSearchParams().get("page");

  const { data: result } = useQuery({
    queryKey: ["transaction-metric"],
    queryFn: () => paymentApiService.getOverallTransactionMetrics(),
  });

  const {
    totalTransactionValue = 0,
    totalTransactions = 0,
    totalWalletBalance = 0,
  } = result?.data || {};

  return (
    <MetricWrapper>
      <MetricItem>
        <MetricItemTitle>Total Transaction Volume (NGN)</MetricItemTitle>
        <MetricValue>{formatCurrency(totalTransactionValue)}</MetricValue>
      </MetricItem>
      <MetricItem>
        <MetricItemTitle>Total Number of Transactions</MetricItemTitle>
        <MetricValue>{totalTransactions}</MetricValue>
      </MetricItem>
      <MetricItem>
        <MetricItemTitle>Average Transaction Value (NGN)</MetricItemTitle>
        <MetricValue>₦{averageTransactionValue}</MetricValue>
      </MetricItem>
      <MetricItem>
        <MetricItemTitle>Total Profit/Loss from Trades (NGN)</MetricItemTitle>
        <MetricValue>₦{totalProfitAndLoss}</MetricValue>
      </MetricItem>
      <MetricItem>
        <MetricItemTitle>Pending Transactions</MetricItemTitle>
        <MetricValue>{pendingTransaction}</MetricValue>
      </MetricItem>
    </MetricWrapper>
  );
};
