import { motion } from "framer-motion";
import styled from "styled-components";
import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  background?: string;
}

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(13, 13, 12, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;
`;

const ModalContent = styled(motion.div)<{
  width?: string;
  height?: string;
  padding?: string;
  background?: string;
}>`
  background: ${({ background }) => background || "white"};
  padding: ${({ padding }) => padding || "4.5rem"};
  border-radius: 8px;
  width: ${({ width }) => width || "535px"};
  height: ${({ height }) => height || "auto"};
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #8C8C89 #F5F4F2;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F5F4F2;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #8C8C89;
    border-radius: 6px;
  }
  
  @media (max-width: 576px) {
    padding: 2rem;
    border-radius: 6px;
    width: 100%;
  }
`;

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 20,
    transition: { 
      duration: 0.2 
    } 
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
  padding,
  background,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Backdrop
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <ModalContent
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        width={width}
        height={height}
        padding={padding || (isMobile ? "2rem" : "4.5rem")}
        background={background}
      >
        {children}
      </ModalContent>
    </Backdrop>
  );
};

export default Modal;