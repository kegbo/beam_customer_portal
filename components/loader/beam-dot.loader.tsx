import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const DotRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
`;

const Dot = styled.div<{ $delay: number }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #18A0FB;
  animation: ${bounce} 1.2s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
`;

export function BeamTableLoader() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <DotRow key={rowIndex}>
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Dot key={colIndex} $delay={colIndex * 0.2} />
          ))}
        </DotRow>
      ))}
    </div>
  );
}
