import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

const ChartContainer = styled.div`
  height: 140px;
  background-color: #f5f4f2;
  padding: 10px;
`;

const ChartTitle = styled.p`
  font-size: 6px;
  color: #a6a5a2;
`;

const ChartWrapper = styled.div`
  height: calc(100% - 10px);
  position: relative;
`;

const StockChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  // Chart data
  const data = [0, 5, 10, 15, 20, 25];
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: "#007AFF",
            backgroundColor: "transparent",
            fill: true,
            tension: 0.4,
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 0.8,
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
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 7,
              },
              color: "#A6A5A2",
            },
            grid: {
              display: true,
              color: "#E5E7EB",
              lineWidth: 0.5,
            },
          },
          y: {
            ticks: {
              font: {
                size: 7,
              },
              color: "#A6A5A2",
            },
            grid: {
              display: true,
              color: "#E5E7EB",
              lineWidth: 0.5,
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
  }, []);

  return (
    <div>
      <ChartContainer>
        <ChartTitle>Price / NGN</ChartTitle>
        <ChartWrapper>
          <canvas ref={canvasRef} />
        </ChartWrapper>
      </ChartContainer>
    </div>
  );
};

export default StockChart;
