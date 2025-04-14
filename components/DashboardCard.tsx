import React from "react";
import styled from "styled-components";
import { ArrowUpIcon } from "./icons/arrow-up";
import { ArrowDownIcon } from "./icons/arrow-down";
import { StraightArrowUpIcon } from "./icons/straight-arrow-up";
import { StraightArrowDownIcon } from "./icons/straight-arrow-down";

interface DashboardCardProps {
  title: string;
  stats: string | number;
  gain?: string;
  loss?: string;
  className?: string;
}

const CardContainer = styled.div<{ className?: string }>`
  ${({ className }) => className || ""}
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem 0;
  }
`;

const CardTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: #8a8a88;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const CardStats = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #0d0d0c;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CardMetricsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 2.5rem;
  font-size: 0.5rem;
  
  @media (max-width: 768px) {
    padding-bottom: 1rem;
    gap: 1rem;
  }
`;

const GainMetric = styled.span`
  display: flex;
  align-items: center;
  color: #22c55e;
`;

const LossMetric = styled.span`
  display: flex;
  align-items: center;
  color: #ef4444;
`;

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  stats,
  gain,
  loss,
  className,
}) => {
  return (
    <CardContainer className={className}>
      <CardTitle>{title}</CardTitle>
      <CardStats>{stats}</CardStats>
      {(gain || loss) && (
        <CardMetricsContainer>
          {gain && (
            <GainMetric>
              <StraightArrowUpIcon
                style={{ marginRight: "0.25rem" }}
                stroke="#22C55E"
                width={15}
                height={15}
              />
              <span>{gain}</span>
            </GainMetric>
          )}
          {loss && (
            <LossMetric>
              <StraightArrowDownIcon
                style={{ marginRight: "0.25rem" }}
                stroke="#EF4444"
                width={15}
                height={15}
              />
              <span>{loss}</span>
            </LossMetric>
          )}
        </CardMetricsContainer>
      )}
    </CardContainer>
  );
};

export default DashboardCard;