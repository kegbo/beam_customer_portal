"use client";

import styled from "styled-components";

export const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const QueryTabWrapper = styled.ul`
  display: flex;
  align-items: center;
  height: 1.75rem;
  gap: 0.375rem;
  list-style-type: none;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
`;

export const QueryTabItem = styled.li<{ $isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 4.375rem;
  border-radius: 0.313rem;
  padding: 0 0.75rem;
  border: 1px solid ${({ $isActive }) => ($isActive ? "#0d0d0c" : "#D9D8D5")};
  font-size: 0.75rem;
  height: 1.75rem;
  color: ${({ $isActive }) => ($isActive ? "#0d0d0c" : "#8C8C89")};
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;
  white-space: nowrap;
  
  @media (max-width: 480px) {
    min-width: auto;
    padding: 0 0.5rem;
  }
`;

export const CopyButton = styled.button`
  width: 20px;
  height: 20px;
`;

export const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;