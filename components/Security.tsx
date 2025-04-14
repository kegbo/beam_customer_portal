import styled from "styled-components";
import { useEffect, useState } from "react";

const SecurityWrapper = styled.div<{ $isMobile?: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '65px')};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SecurityIcon = styled.div<{ $isMobile?: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '16px' : '18px')};
  height: ${({ $isMobile }) => ($isMobile ? '16px' : '18px')};
  background-color: #18A0FB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #0d0d0c;
`;

const SecurityName = styled.span<{ $isMobile?: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '0.7rem' : '0.75rem')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${({ $isMobile }) => ($isMobile ? 'calc(100% - 24px)' : '45px')};
`;

export const Security = ({ name }: { name: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <SecurityWrapper $isMobile={isMobile}>
      <SecurityIcon $isMobile={isMobile}>
        {name.charAt(0)}
      </SecurityIcon>
      <SecurityName $isMobile={isMobile}>{name}</SecurityName>
    </SecurityWrapper>
  );
};