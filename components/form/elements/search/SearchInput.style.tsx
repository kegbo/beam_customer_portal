import styled from "styled-components";

// Update the search input styling for responsiveness
export const SearchInputWrapper = styled.div<{ $variant?: string }>`
  width: 20.508rem;
  height: 2rem;
  background-color: ${({ $variant }) =>
    $variant === "ghost" ? "white" : "#f5f4f2"};
  color: ${({ $variant }) => ($variant === "ghost" ? "#1F384C" : "#1f384c;")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.5rem;
  padding-right: 0.783rem;
  border: 1px solid transparent;
  border-color: ${({ $variant }) =>
    $variant === "ghost" ? "#C8CBD9" : "transparent"};
    
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const SearchInputEl = styled.input`
  padding: 0 0.984rem;
  font-size: 0.75rem;
  outline: none;
  flex: 1;
  background: transparent;
  transition: all 0.3s ease-in-out;
  width: 100%;
`;