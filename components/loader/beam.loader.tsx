"use client";

import styled, { keyframes } from "styled-components";

const pulseBeam = keyframes`
  0%, 100% {
    transform: scaleY(0.3);
    opacity: 0.6;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const spinCircle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at center, #fefefe 0%, #f5f5f5 100%);
`;

const BeamContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const BeamSVG = styled.svg`
  width: 120px;
  height: 60px;
  position: absolute;
  top: 30px;
  left: 0;
`;

const BeamBar = styled.rect<{ $delay: number }>`
  transform-origin: center bottom;
  animation: ${pulseBeam} 1.5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  rx: 3;
  ry: 3;
  fill: #18A0FB;
`;

const OrbitCircle = styled.svg`
  width: 120px;
  height: 120px;
  animation: ${spinCircle} 2s linear infinite;
`;

export function BeamLoader() {
  return (
    <LoaderWrapper>
      <BeamContainer>
        <BeamSVG viewBox="0 0 120 60">
          <BeamBar x="5" y="10" width="15" height="40" $delay={0} />
          <BeamBar x="30" y="10" width="15" height="40" $delay={0.15} />
          <BeamBar x="55" y="10" width="15" height="40" $delay={0.3} />
          {/* <BeamBar x="80" y="10" width="15" height="40" $delay={0.45} />
          <BeamBar x="105" y="10" width="15" height="40" $delay={0.6} /> */}
        </BeamSVG>
      </BeamContainer>
    </LoaderWrapper>
  );
}
