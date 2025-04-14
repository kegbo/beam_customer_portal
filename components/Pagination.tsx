import styled from "styled-components";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRight } from "./icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 1.5rem;
  
  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-top: 2rem;
  }
`;

const PageButton = styled.button<{ $active: boolean }>`
  font-family: var(--font-primary);
  border: 0.063rem solid transparent;
  color: ${({ $active }) => ($active ? "#0D0D0C" : "#8C8C89")};
  border-color: ${({ $active }) => ($active ? "#FFC130" : "transparent")};
  font-size: 0.75rem;
  cursor: pointer;
  border-radius: 0.313rem;
  transition: background 0.3s;
  height: 1.75rem;
  width: 1.75rem;
  
  &:hover {
    background-color: ${({ $active }) => ($active ? "#FFC130" : "#F5F4F2")};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const PaginationDescription = styled.p`
  font-size: 0.75rem;
  color: #0d0d0c;
  margin: 0.5rem;
  
  @media (min-width: 768px) {
    margin-right: 1.5rem;
    margin: 0 1.5rem 0 0;
  }
`;

const NavButtonWrapper = styled.div`
  display: flex;
  margin-left: 0.5rem;
  
  @media (min-width: 768px) {
    margin-left: 1.5rem;
  }
`;

const NavButton = styled.button<{ $side: string }>`
  height: 2.25rem;
  width: 2.25rem;
  border-width: 0.031rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $side }) =>
    $side === "left" ? "border-top-left-radius: 0.313rem;" : ""};
  ${({ $side }) =>
    $side === "left" ? "border-bottom-left-radius: 0.313rem;" : ""};
  ${({ $side }) =>
    $side === "right" ? "border-top-right-radius: 0.313rem;" : ""};
  ${({ $side }) =>
    $side === "right" ? "border-bottom-right-radius: 0.313rem;" : ""};
  background-color: white;
  border-color: #d9d8d5;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    background-color: #F5F4F2;
  }
  
  &:not(:disabled):active {
    transform: scale(0.98);
  }
`;

const PageButtonsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const [page, setPage] = useState<number>(currentPage);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handlePageClick = (pageNum: number) => {
    updateQuery(pageNum + "");
    setPage(pageNum);
    onPageChange(pageNum);
  };

  const handleNext = () => {
    if (page < totalPages) {
      handlePageClick(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      handlePageClick(page - 1);
    }
  };

  const pathname = usePathname(); // Get current path
  const searchParams = useSearchParams(); // Get query params
  const router = useRouter();

  const updateQuery = (tab: string) => {
    const params = new URLSearchParams(searchParams); // Create a copy of searchParams
    params.set("page", tab); // Update tab value
    router.push(`${pathname}?${params.toString()}`, { scroll: false }); // Push updated query string
  };

  // Generate a limited set of page buttons for mobile view
  const getPageButtons = () => {
    const buttons = [];
    let startPage, endPage;
    
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (page + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = page - 2;
        endPage = page + 2;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          $active={page === i}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </PageButton>
      );
    }
    
    return buttons;
  };

  return (
    <PaginationWrapper>
      <PaginationDescription>
        Page {page} of {totalPages}
      </PaginationDescription>
      
      <PageButtonsContainer>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index + 1}
            $active={page === index + 1}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </PageButtonsContainer>
      
      <NavButtonWrapper>
        <NavButton $side="left" onClick={handlePrev} disabled={page === 1}>
          <ChevronLeftIcon width={24} height={24} />
        </NavButton>
        <NavButton
          $side="right"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          <ChevronRight width={24} height={24} />
        </NavButton>
      </NavButtonWrapper>
    </PaginationWrapper>
  );
}