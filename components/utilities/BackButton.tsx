import styled from "styled-components";

export const BackButtonWrapper = styled.button`
  height: 30px;
  width: 30px;
  border-radius: 5px;
  border: 0.031rem solid #d9d8d5;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

export const BackButton = ({
  style,
  icon,
  onClick,
}: {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <BackButtonWrapper style={style} onClick={onClick}>
      {icon || (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.61788 7.79976C4.19508 7.35053 4.19508 6.6498 4.61788 6.20057L8.90827 1.64203C9.12907 1.40743 9.49825 1.39625 9.73285 1.61705C9.96745 1.83785 9.97864 2.20703 9.75784 2.44163L5.46745 7.00016L9.75784 11.5587C9.97864 11.7933 9.96745 12.1625 9.73285 12.3833C9.49825 12.6041 9.12907 12.5929 8.90827 12.3583L4.61788 7.79976Z"
            fill="#0D0D0C"
          />
        </svg>
      )}
    </BackButtonWrapper>
  );
};
