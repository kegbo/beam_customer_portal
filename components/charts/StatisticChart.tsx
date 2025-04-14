import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

interface StatisticChartProps {
  color: string;
}

const ChartContainer = styled.div`
  width: 2.75rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
`;

const StatisticChart: React.FC<StatisticChartProps> = ({ color }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  // Fixed dataset
  const data = [12, 19, 3, 5, 2, 3];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
            label: "Value",
            data: data,
            fill: false,
            borderColor: color,
            tension: 0.4,
            borderWidth: 0.7,
            pointStyle: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
            enabled: false, // Disable tooltips
          },
        },
        scales: {
          x: {
            display: false, // Hide x-axis
            grid: {
              display: false, // Hide x-axis grid lines
              circular: false,
            },
          },
          y: {
            display: false, // Hide the y-axis
            grid: {
              display: false, // Hide y-axis grid lines
              circular: false,
            },
            min: 0, // Start y-axis at 0
          },
        },
        elements: {
          point: {
            radius: 0, // Hide data points
          },
          line: {
            borderWidth: 0.7, // Thin line
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
  }, [color]);

  return (
    <ChartContainer>
      <canvas ref={canvasRef} />
    </ChartContainer>
  );
};

export default StatisticChart;
