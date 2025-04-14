import styled from "styled-components";

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 1.131rem;
`;

export const ModalDescription = styled.p`
  font-size: 0.75rem;
  color: #595957;
  margin-bottom: 1.119rem;
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 37px;
`;

const UL = styled.ul`
  list-style-type: none;
`;

export const InitializeFundingForm: React.FC<{
  onCompleted?: () => void;
  onCancel?: () => void;
}> = ({ onCompleted, onCancel }) => {
  return (
    <>
      <ModalTitle>Fund Wallet</ModalTitle>
      <ModalDescription>
        Please enter the amount you wish to add.
      </ModalDescription>
    </>
  );
};
