import { IconButton, SvgIcon } from "@mui/material";
import type { ReactElement } from "react";
import React from "react";

type Props = {
  currencyCode: string;
  onClick: (currencyCode: string) => void;
  color: "primary" | "secondary";
};

const ChartButtonComponent = (props: Props): ReactElement => {
  const handleClick = (): void => props.onClick(props.currencyCode);
  return (
    <IconButton onClick={handleClick}>
      <SvgIcon viewBox="0 0 24 24" color={props.color}>
        <path
          d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 15L12 9L16 13L21 7"
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

export const ChartButton = React.memo(ChartButtonComponent);
