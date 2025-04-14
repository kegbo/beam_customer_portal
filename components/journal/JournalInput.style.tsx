import styled from "styled-components";

export const JournalHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 204px 1fr 122px 122px 36px;
`;

export const JournalHeaderColumn = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  padding: 0px 10px;
  font-weight: 600;
  border-right: 1px solid #d9d8d5;
  border-top: 1px solid #d9d8d5;
  border-bottom: 1px solid #d9d8d5;
  &:first-child {
    border-left: 1px solid #d9d8d5;
  }
`;

export const JournalBody = styled.div`
  position: relative;
`;

export const JournalFormFooter = styled.div`
  height: 34px;
  display: grid;
  grid-template-columns: 204px 1fr 122px 122px 36px;
  font-size: 12px;
  background-color: #f2f2f2;
  align-items: center;
  font-weight: 600;
  color: #0d0d0c;
`;

export const JournalActionButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const JournalRowWrapper = styled.div`
  position: relative;
`;

export const JournalRow = styled.div<{ $focused: boolean }>`
  display: grid;
  grid-template-columns: 204px 1fr 122px 122px 36px;
  height: 42px;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  z-index: ${({ $focused }) => ($focused ? 2 : 1)};
  transform: ${({ $focused }) => ($focused ? "scale(1.02)" : "scale(1)")};
  box-shadow: ${({ $focused }) =>
    $focused ? "0px 0px 9px 0px #0000001f" : "none"};
  border-radius: ${({ $focused }) => ($focused ? "8px" : 0)};
  border-bottom: 0.031rem solid
    ${({ $focused }) => ($focused ? "transparent" : "#d9d8d5")};
  background-color: white;
`;

export const JournalDataColumn = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $focused }) => ($focused ? "0px 10px" : "0px 5px")};
  z-index: 3;
  border-right: 0.031rem solid
    ${({ $focused }) => ($focused ? "transparent" : "#d9d8d5")};
  &:first-child {
    border-left: 0.031rem solid
      ${({ $focused }) => ($focused ? "transparent" : "#d9d8d5")};
  }
`;
