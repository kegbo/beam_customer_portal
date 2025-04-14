import React, { useEffect, useState } from "react";
import { BackButton } from "./BackButton";
import { ThreeDotLoader } from "../loader/threedot.loader";
import { CancelIcon } from "../icons/cancel";
import {
  Backdrop,
  DrawerContainerWrapper,
  DrawerContainer,
  DrawerHeader,
  DrawerContent,
  DrawerFooter,
  DrawerFooterText,
} from "./Drawer.style";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  hideFooter?: boolean;
  footer?: React.ReactNode;
  isMultiStep?: boolean;
  isLoading?: boolean;
  onBack?: () => void;
  showCloseButton?: boolean;
  contentStyle?: React.CSSProperties;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  width = "450px",
  children,
  title,
  footer,
  hideFooter = false,
  isMultiStep = false,
  onBack,
  isLoading,
  showCloseButton,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Backdrop $isOpen={isOpen} onClick={onClose} $isMounted={isMounted} />
      )}
      <DrawerContainerWrapper
        $isOpen={isOpen}
        $width={width}
        $isMounted={isMounted}
      >
        <DrawerContainer $hideFooter={hideFooter}>
          {title && (
            <DrawerHeader>
              <div>
                {isMultiStep && <BackButton onClick={onBack} />}
                <div>{title}</div>
              </div>
              {showCloseButton && (
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    gap: "6px",
                  }}
                  onClick={onClose}
                >
                  <span>Close</span> <CancelIcon width={16} height={16} />
                </button>
              )}
            </DrawerHeader>
          )}
          <DrawerContent>
            {isLoading ? <ThreeDotLoader /> : isOpen && children}
          </DrawerContent>
          {!hideFooter &&
            (footer || (
              <DrawerFooter>
                <img src="./drawer-footer-shield.svg" width="24" height="24" />
                <DrawerFooterText>
                  Secured and Collateralised Platform{" "}
                  <span style={{ fontWeight: 600, color: "#0D0D0C" }}>
                    Powered by Beam
                  </span>
                </DrawerFooterText>
              </DrawerFooter>
            ))}
        </DrawerContainer>
      </DrawerContainerWrapper>
    </>
  );
};

export default Drawer;
