"use client";
import { SvgProps } from "./icon.interface";

export const AccountIcon: React.FC<SvgProps> = ({ fillColor = "#D9D8D5" }) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8.993C16 5.1325 12.864 2 9 2C5.136 2 2 5.1325 2 8.993C2 11.1193 2.966 13.0355 4.478 14.3217C4.492 14.3357 4.506 14.3358 4.506 14.3498C4.632 14.4478 4.758 14.5457 4.898 14.6438C4.968 14.6858 5.024 14.7409 5.094 14.7969C6.25128 15.5802 7.61653 15.9992 9.014 16C10.4115 15.9992 11.7767 15.5802 12.934 14.7969C13.004 14.7549 13.06 14.6997 13.13 14.6569C13.256 14.5598 13.396 14.4618 13.522 14.3638C13.536 14.3498 13.55 14.3497 13.55 14.3357C15.034 13.0346 16 11.1193 16 8.993ZM9 15.1189C7.684 15.1189 6.48 14.6989 5.486 13.9998C5.5 13.8877 5.528 13.7766 5.556 13.6646C5.6397 13.3612 5.76203 13.0698 5.92 12.7975C6.074 12.5315 6.256 12.2935 6.48 12.0835C6.69 11.8735 6.942 11.6784 7.194 11.5244C7.46 11.3704 7.74 11.2584 8.048 11.1744C8.3585 11.0912 8.67856 11.0491 9 11.0492C9.95441 11.042 10.8738 11.4082 11.562 12.0695C11.884 12.3915 12.136 12.7692 12.318 13.2026C12.416 13.4546 12.486 13.7203 12.528 13.9998C11.4948 14.7261 10.263 15.1169 9 15.1189ZM6.858 8.64388C6.7349 8.36136 6.67288 8.05603 6.676 7.74787C6.676 7.44075 6.732 7.13275 6.858 6.85275C6.984 6.57275 7.152 6.32162 7.362 6.11162C7.572 5.90162 7.824 5.7345 8.104 5.6085C8.384 5.4825 8.692 5.4265 9 5.4265C9.322 5.4265 9.616 5.4825 9.896 5.6085C10.176 5.7345 10.428 5.9025 10.638 6.11162C10.848 6.32162 11.016 6.57363 11.142 6.85275C11.268 7.13275 11.324 7.44075 11.324 7.74787C11.324 8.06987 11.268 8.36387 11.142 8.643C11.0211 8.91924 10.8502 9.17079 10.638 9.385C10.4237 9.59692 10.1722 9.76748 9.896 9.88813C9.31738 10.1254 8.66862 10.1254 8.09 9.88813C7.81383 9.76748 7.56228 9.59692 7.348 9.385C7.13559 9.17382 6.96881 8.92215 6.858 8.64388ZM13.354 13.2866C13.354 13.2586 13.34 13.2446 13.34 13.2166C13.2026 12.7785 12.9996 12.3637 12.738 11.9864C12.4762 11.6062 12.1547 11.2709 11.786 10.9932C11.5043 10.7813 11.1989 10.6027 10.876 10.4613C11.0222 10.3634 11.1582 10.2512 11.282 10.1261C11.4907 9.92007 11.674 9.68976 11.828 9.44013C12.1391 8.93117 12.2993 8.34432 12.29 7.74787C12.2946 7.30643 12.2088 6.86871 12.038 6.46163C11.8696 6.06932 11.6271 5.71313 11.324 5.4125C11.0206 5.11592 10.6645 4.87853 10.274 4.7125C9.86631 4.54175 9.42797 4.45628 8.986 4.46137C8.54396 4.45656 8.10563 4.54232 7.698 4.71338C7.30324 4.87738 6.94599 5.12001 6.648 5.4265C6.34987 5.72835 6.11226 6.08446 5.948 6.47563C5.77718 6.88271 5.69142 7.32043 5.696 7.76188C5.696 8.06988 5.738 8.36358 5.822 8.643C5.906 8.937 6.018 9.203 6.172 9.45412C6.312 9.70613 6.508 9.93013 6.718 10.1401C6.844 10.2661 6.984 10.3778 7.138 10.4753C6.81364 10.6196 6.50805 10.803 6.228 11.0213C5.864 11.3013 5.542 11.6364 5.276 12.0004C5.01199 12.3763 4.80883 12.7915 4.674 13.2306C4.66 13.2586 4.66 13.2866 4.66 13.3006C3.554 12.1815 2.868 10.6713 2.868 8.993C2.868 5.6225 5.626 2.86712 9 2.86712C12.374 2.86712 15.132 5.6225 15.132 8.993C15.1302 10.603 14.4909 12.1467 13.354 13.2866Z"
        fill={fillColor}
      />
    </svg>
  );
};
