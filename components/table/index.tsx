"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "../Pagination";
import { ThreeDotLoader } from "../loader/threedot.loader";

export interface Column {
  header: string;
  accessor: string;
  width?: string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  totalPages?: number;
  currentPage?: number;
  isLoading?: boolean;
}

const TableContainer = styled.div<{ $columnWidths: string }>`
  display: grid;
  grid-template-columns: ${({ $columnWidths }) => $columnWidths};
  margin-top: 30px;
  color: #3b3a39;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const MobileTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 30px;
`;

const MobileTableCard = styled.div`
  border: 1px solid #d9d8d5;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
`;

const MobileTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MobileTableHeader = styled.div`
  font-weight: 500;
  font-size: 0.75rem;
  color: #8c8c89;
`;

const MobileTableValue = styled.div`
  font-size: 0.75rem;
  color: #3b3a39;
`;

const TableHeader = styled.div`
  display: contents;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderCell = styled.div`
  height: 3rem;
  text-align: left;
  border-top: 1px solid #d9d8d5;
  border-bottom: 1px solid #d9d8d5;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 12px;
  
  @media (max-width: 768px) {
    min-width: 120px;
  }
`;

const TableRow = styled.div`
  display: contents;
`;

const TableCell = styled.div`
  height: 2.625rem;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 12px;
  position: relative;
  
  @media (max-width: 768px) {
    min-width: 120px;
  }
`;

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  totalPages = 0,
  currentPage = 0,
  isLoading,
}) => {
  const columnWidths = columns.map((col) => col.width || "1fr").join(" ");
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  
  if (isLoading) {
    return <ThreeDotLoader />;
  }
  
  return (
    <>
      {isMobile ? (
        <MobileTableContainer>
          {data.map((row, rowIndex) => (
            <MobileTableCard key={rowIndex}>
              {columns.map((col, colIndex) => (
                <MobileTableRow key={colIndex}>
                  <MobileTableHeader>{col.header}</MobileTableHeader>
                  <MobileTableValue>
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : row[col.accessor]}
                  </MobileTableValue>
                </MobileTableRow>
              ))}
            </MobileTableCard>
          ))}
        </MobileTableContainer>
      ) : (
        <TableContainer $columnWidths={columnWidths}>
          <TableHeader>
            {columns.map((col, index) => (
              <HeaderCell key={index}>{col.header}</HeaderCell>
            ))}
          </TableHeader>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : row[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableContainer>
      )}
      
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </>
  );
};