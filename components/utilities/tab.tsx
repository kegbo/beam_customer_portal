"use client";

import { useState, ReactNode, useRef, useEffect } from "react";
import styled from "styled-components";

// Styled Components
const TabsContainer = styled.div<{ $isResponsive?: boolean }>`
  display: flex;
  gap: 1rem;
  padding-left: ${({ $isResponsive }) => ($isResponsive ? "0.5rem" : "1.813rem")};
  position: relative;
  overflow-x: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  @media (min-width: 768px) {
    gap: 1.5rem;
    padding-left: 1.813rem;
    overflow-x: visible;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  font-size: 0.75rem;
  border: none;
  color: ${({ $active }) => ($active ? "#0d0d0c" : "#8C8C89")};
  cursor: pointer;
  line-height: 1.5rem;
  letter-spacing: 0.031rem;
  transition: all 0.3s ease-in-out;
  position: relative;
  padding-bottom: 0.438rem;
  white-space: nowrap;
  background: transparent;
  
  &:active {
    transform: scale(0.98);
  }
`;

const Underline = styled.div<{ left: number; width: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 0.188rem;
  background: #18A0FB;
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
`;

const TabContent = styled.div<{ $isResponsive?: boolean }>`
  padding-left: ${({ $isResponsive }) => ($isResponsive ? "0.5rem" : "1.813rem")};
  padding-right: ${({ $isResponsive }) => ($isResponsive ? "0.5rem" : "0")};
  border-top: 0.063rem solid #d9d8d5;
  
  @media (min-width: 768px) {
    padding-left: 1.813rem;
    padding-right: 0;
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
  z-index: 1;
  pointer-events: none;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

interface TabProps {
  label: string;
  children: ReactNode;
}

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  isResponsive?: boolean;
}

export function Tabs({ children, isResponsive = false }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  // Update the underline position when activeIndex changes or on resize
  useEffect(() => {
    const updateUnderline = () => {
      if (tabRefs.current[activeIndex]) {
        const { offsetLeft, offsetWidth } = tabRefs.current[activeIndex]!;
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    
    return () => {
      window.removeEventListener('resize', updateUnderline);
    };
  }, [activeIndex]);

  // Check scroll indicators
  useEffect(() => {
    const checkScroll = () => {
      if (tabsContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
        setShowLeftIndicator(scrollLeft > 0);
        setShowRightIndicator(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    checkScroll();
    
    const tabsElement = tabsContainerRef.current;
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

  // Scroll to active tab
  useEffect(() => {
    if (tabRefs.current[activeIndex] && tabsContainerRef.current) {
      const tabElement = tabRefs.current[activeIndex];
      const containerElement = tabsContainerRef.current;
      
      if (tabElement) {
        const scrollLeft = tabElement.offsetLeft - containerElement.offsetWidth / 2 + tabElement.offsetWidth / 2;
        
        containerElement.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <ScrollIndicator $show={showLeftIndicator} $direction="left" />
        <TabsContainer ref={tabsContainerRef} $isResponsive={isResponsive}>
          {children?.map((tab, index) => (
            <TabButton
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              $active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {tab.props.label}
            </TabButton>
          ))}
          <Underline left={underlineStyle.left} width={underlineStyle.width} />
        </TabsContainer>
        <ScrollIndicator $show={showRightIndicator} $direction="right" />
      </div>
      <TabContent $isResponsive={isResponsive}>{children[activeIndex]}</TabContent>
    </div>
  );
}