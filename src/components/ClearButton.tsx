import { IconButton, SvgIcon, type IconButtonProps } from "@mui/material";
import type { ReactElement } from "react";

type Props = {
  onClick: () => void;
  color: "primary" | "secondary";
} & Omit<IconButtonProps, "onClick" | "color">;

export const ClearButton = (props: Props): ReactElement => {
  const { onClick, color, ...rest } = props;
  return (
    <IconButton onClick={onClick} {...rest}>
      <SvgIcon viewBox="0 0 24 24" color={color}>
        <path
          d="M9 9L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 9L9 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgIcon>
    </IconButton>
  );
};
