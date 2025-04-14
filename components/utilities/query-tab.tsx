"use client";

import styled from "styled-components";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const QueryTabWrapper = styled.ul`
  display: flex;
  align-items: center;
  height: auto;
  min-height: 1.75rem;
  gap: 0.375rem;
  list-style-type: none;
  overflow-x: auto;
  padding: 0 16px;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  @media (min-width: 768px) {
    padding: 0;
    overflow-x: visible;
  }
`;

const QueryTabItem = styled.li<{ $isActive?: boolean }>`
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
  
  &:active {
    transform: scale(0.98);
  }
`;

const ScrollIndicator = styled.div<{ $show: boolean; $direction: 'left' | 'right' }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: absolute;
  top: 0;
  ${({ $direction }) => $direction === 'left' ? 'left: 0' : 'right: 0'};
  height: 100%;
  width: 20px;
  background: linear-gradient(
    to ${({ $direction }) => $direction}, 
    rgba(255, 255, 255, 0.9), 
    rgba(255, 255, 255, 0)
  );
  pointer-events: none;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const TabContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const QueryTab = ({
  data,
  queryKey,
}: {
  data: string[];
  queryKey: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabsRef = useRef<HTMLUListElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);

  const updateQuery = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(queryKey, tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const checkScroll = () => {
      if (tabsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
        setShowLeftIndicator(scrollLeft > 0);
        setShowRightIndicator(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    checkScroll();
    
    const tabsElement = tabsRef.current;
    if (tabsElement) {
      tabsElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    
    return () => {
      if (tabsElement) {
        tabsElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  // Scroll active tab into view on initial render
  useEffect(() => {
    const activeTab = searchParams.get(queryKey);
    if (activeTab && tabsRef.current) {
      const activeElement = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeElement) {
        const scrollLeft = activeElement.getBoundingClientRect().left 
          - tabsRef.current.getBoundingClientRect().left 
          + tabsRef.current.scrollLeft 
          - (tabsRef.current.offsetWidth / 2) 
          + (activeElement as HTMLElement).offsetWidth / 2;
        
        tabsRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [searchParams, queryKey]);

  return (
    <TabContainer>
      <ScrollIndicator $show={showLeftIndicator} $direction="left" />
      <QueryTabWrapper ref={tabsRef}>
        {data.map((item, i) => (
          <QueryTabItem
            data-tab={item}
            $isActive={item === searchParams.get(queryKey)}
            onClick={() => updateQuery(item)}
            key={i}
          >
            {item}
          </QueryTabItem>
        ))}
      </QueryTabWrapper>
      <ScrollIndicator $show={showRightIndicator} $direction="right" />
    </TabContainer>
  );
};