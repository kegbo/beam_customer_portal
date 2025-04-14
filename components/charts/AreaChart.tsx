"use client";

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";
import Button from "@/components/utilities/Button";
import { QueryTab } from "../utilities/query-tab";
import { useSearchParams } from "next/navigation";

// Define the type for the time ranges
type TimeRange = "3 years" | "12 months" | "6 months" | "30 days" | "7 days";

const ChartContainer = styled.div`
  background-color: transparent;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  padding-right: 0.75rem;
  
  @media (max-width: 768px) {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const AssetInfoContainer = styled.div``;

const AssetTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 400;
  color: #0d0d0c;
`;

const AssetValue = styled.p`
  font-size: 1.25rem;
  font-weight: normal;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 300;
  overflow-x: auto;
  width: 100%;
  padding-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const ChartWrapper = styled.div`
  height: 200px;
  position: relative;
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const AreaChart: React.FC = () => {
  const timeRange = (useSearchParams().get("timeRange") ||
    "3 years") as TimeRange;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Example data for each time range
  const timeRangeData: Record<TimeRange, number[]> = {
    "3 years": [
      40000, 25000, 30000, 15000, 16000, 18000, 25000, 20000, 27000, 23000,
      29000, 35000, 40000, 25000, 30000, 15000, 16000, 18000, 25000, 20000,
      27000, 23000, 29000, 35000, 40000, 25000, 30000, 15000, 16000, 18000,
      25000, 20000, 27000, 23000, 29000, 35000,
    ],
    "12 months": [
      40000, 25000, 30000, 15000, 16000, 18000, 25000, 20000, 27000, 23000,
      29000, 35000,
    ],
    "6 months": [16000, 20000, 17000, 18000, 22000, 28000],
    "30 days": [
      22000, 20000, 18000, 16000, 15000, 14000, 13000, 12000, 11000, 10000,
    ],
    "7 days": [14000, 13000, 12000, 11000, 15000, 16000, 18000],
  };

  // Labels for each time range
  const timeRangeLabels: Record<TimeRange, string[]> = {
    "3 years": [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    "12 months": [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    "6 months": ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    "30 days": [
      "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", 
      "Day 6", "Day 7", "Day 8", "Day 9", "Day 10",
    ],
    "7 days": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  };

  // Create/update the chart when timeRange changes
  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Create new chart
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: timeRangeLabels[timeRange],
        datasets: [
          {
            label: "Assets holdings",
            data: timeRangeData[timeRange],
            backgroundColor: "rgba(24, 160, 251, 0.05)",
            borderColor: "#18A0FB",
            fill: true,
            tension: 0.5,
            pointBorderWidth: isMobile ? 2 : 4,
            pointRadius: 0,
            pointHoverRadius: isMobile ? 3 : 4,
            borderWidth: isMobile ? 1 : 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}`;
              },
            },
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: isMobile ? 8 : 12,
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: isMobile ? 6 : 12,
            },
          },
          y: {
            min: 0,
            max: 40000,
            ticks: {
              stepSize: 10000,
              callback: function (value) {
                return value.toLocaleString();
              },
              font: {
                size: isMobile ? 8 : 12,
              },
              maxTicksLimit: isMobile ? 4 : undefined,
            },
            grid: {
              color: "#F2F2ED",
            },
            border: {
              dash: [15, 20],
            },
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [timeRange, isMobile]);

  return (
    <ChartContainer>
      {/* Filters section */}
      <ChartHeader>
        <AssetInfoContainer>
          <AssetTitle>Assets Holding</AssetTitle>
          <AssetValue>₦ 7,852.000</AssetValue>
        </AssetInfoContainer>
        <FilterContainer>
          <QueryTab
            queryKey="timeRange"
            data={["3 years", "12 months", "6 months", "30 days", "7 days"]}
          />
        </FilterContainer>
      </ChartHeader>

      {/* Chart */}
      <ChartWrapper>
        <canvas ref={canvasRef} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default AreaChart;