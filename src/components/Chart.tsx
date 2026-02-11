import { useEffect, useState, type ReactElement } from "react";
import type { Currency } from "../redux/firestoreSlice";
import { Box, Dialog, DialogContent, Fade, useMediaQuery, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ClearButton } from "./ClearButton";

type Props = {
  currencyData: Currency[];
  open: boolean;
  onClose: () => void;
};

export const Chart = ({ currencyData, open, onClose }: Props): ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollPromptVisible, setScrollPromptVisible] = useState(true);

  useEffect(() => {
    if (!isMobile || !open) {
      return;
    }
    const timeout = setTimeout(() => setScrollPromptVisible(false), 5000);
    return (): void => {
      clearTimeout(timeout);
      setScrollPromptVisible(true);
    };
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogContent>
        {open && (
          <Box sx={{ overflowX: "auto" }}>
            <Box sx={{ minWidth: isMobile ? 800 : "fit-content" }}>
              <ClearButton
                onClick={onClose}
                color="primary"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  p: 0,
                  opacity: 0.5,
                  transition: "opacity 0.25s",
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
              {isMobile && (
                <Fade in={scrollPromptVisible} timeout={750}>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      color: "orange",
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  >
                    {"Scroll >"}
                  </Box>
                </Fade>
              )}
              <LineChart
                dataset={currencyData}
                margin={{ right: 50 }}
                sx={{
                  height: {
                    xs: 400,
                    sm: 450,
                    md: 500,
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
                    height: 105,
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
                    labelMarkType: "square",
                    color: "orange",
                  },
                ]}
                slotProps={{
                  legend: {
                    position: {
                      horizontal: isMobile ? "start" : "center",
                    },
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
