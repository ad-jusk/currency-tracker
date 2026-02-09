import type { ReactElement } from "react";
import type { Currency } from "../redux/firestoreSlice";
import { Button, Dialog, DialogContent } from "@mui/material";
import { LineChart } from "@mui/x-charts";

type Props = {
  currencyData: Currency[];
  open: boolean;
  onClose: () => void;
};

export const Chart = ({ currencyData, open, onClose }: Props): ReactElement => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogContent>
        {open && (
          <>
            <CloseButton onClose={onClose} />
            <LineChart
              dataset={currencyData}
              margin={{ right: 50 }}
              sx={{
                height: {
                  xs: 280,
                  sm: 350,
                  md: 400,
                  lg: 500,
                },
              }}
              xAxis={[
                {
                  dataKey: "date",
                  scaleType: "point",
                  label: "Day",
                  labelStyle: {
                    fontWeight: "bold",
                    fontSize: 16,
                  },
                  tickLabelStyle: {
                    angle: 60,
                    textAnchor: "start",
                    dominantBaseline: "hanging",
                  },
                  height: 100,
                },
              ]}
              yAxis={[
                {
                  label: "Value (PLN)",
                  labelStyle: {
                    fontWeight: "bold",
                    fontSize: 16,
                  },
                  width: 90,
                },
              ]}
              series={[
                {
                  dataKey: "mid",
                  label: `Historical value of ${currencyData[0].code}`,
                  color: "orange",
                },
              ]}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CloseButton = (props: { onClose: () => void }): ReactElement => {
  return (
    <Button
      onClick={props.onClose}
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        minWidth: 0,
        width: { xs: 30, md: 35 },
        height: { xs: 30, md: 35 },
        background: "orange",
        color: "#EEEEEE",
        borderRadius: "50%",
        opacity: 0.5,
        transition: "opacity 0.5s",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      X
    </Button>
  );
};
