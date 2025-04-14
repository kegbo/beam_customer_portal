import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Defining types for the Progress component props
interface ProgressProps {
  progress: number;
}

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 18px;
  border-radius: 26px;
  position: relative;
  border: 0.031rem solid #d9d8d5;
  overflow: hidden;
`;

const Progress = styled.div<ProgressProps>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: linear-gradient(90deg, #3b9271, #04e48b);
  border-radius: 26px;
  transition: width 0.3s ease-in-out;
  position: relative;
`;

const Percentage = styled.span<ProgressProps>`
  position: absolute;
  top: 50%;
  left: ${({ progress }) => (progress < 100 ? `${progress}%` : "50%")};
  transform: translate(
    ${({ progress }) => (progress < 100 ? "-50%, -50%" : "-50%, -50%")}
  );
  font-size: 0.625rem;
  color: white;
  font-weight: 800;
  white-space: nowrap;
  transition: left 0.3s ease-in-out;
`;

interface ProgressBarProps {
  progress: number;
  hidePercentage?: boolean;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  hidePercentage,
  height,
}) => {
  return (
    <ProgressBarContainer style={{ height }}>
      <Progress progress={progress}>
        {!hidePercentage && (
          <Percentage progress={progress}>{progress}%</Percentage>
        )}
      </Progress>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
