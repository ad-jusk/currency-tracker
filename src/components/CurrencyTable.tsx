import { useCallback, useEffect, useState, type ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Alert,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getTableADataAsync, type Currency } from "../redux/firestoreSlice";
import { Table as T } from "../redux/uiSlice";
import { ChartIcon } from "./ChartIcon";
import { Chart } from "./Chart";

export const CurrencyTable = (): ReactElement => {
  const { currentTable } = useAppSelector((state) => state.ui);
  const { currenciesAMostRecent, currenciesA, isLoading, error } = useAppSelector(
    (state) => state.firestore
  );
  const dispatch = useAppDispatch();

  const [chartOpen, setChartOpen] = useState(false);
  const [chartCurrencyData, setChartCurrencyData] = useState<Currency[]>([]);

  useEffect(() => {
    if (currentTable === T.A) {
      dispatch(getTableADataAsync());
    }
  }, [currentTable]);

  const onChartClicked = useCallback(
    (currency: Currency): void => {
      if (currentTable == T.A) {
        setChartCurrencyData(currenciesA[currency.code]);
      } else {
        setChartCurrencyData([]);
      }
      setChartOpen(true);
    },
    [currenciesA, currentTable]
  );

  const onChartClosed = useCallback(() => {
    setChartOpen(false);
    setChartCurrencyData([]);
  }, []);

  if (isLoading || error) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {isLoading ? (
          <CircularProgress size={50} />
        ) : (
          <Alert variant="standard" severity="error" icon={<></>}>
            {`Error: ${error?.message}`}
          </Alert>
        )}
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
        <Table
          sx={{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "& th, & td": {
              border: 1,
              borderColor: "divider",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {["Currency", "Code", "Mid (PLN)", "Chart"].map((header) => (
                <TableCell
                  align={header !== "Chart" ? "left" : "center"}
                  key={header}
                  sx={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    textDecorationColor: "orange",
                    textUnderlineOffset: "8px",
                    whiteSpace: "pre",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currenciesAMostRecent.map((currency) => (
              <TableRow key={currency.id}>
                <TableCell
                  sx={{
                    maxWidth: {
                      xs: 120,
                      md: 250,
                    },
                    overflowX: "auto",
                  }}
                >
                  {currency.currency}
                </TableCell>
                <TableCell align="left">{currency.code}</TableCell>
                <TableCell align="left">{currency.mid}</TableCell>
                <TableCell align="center">
                  <ChartIcon onClick={() => onChartClicked(currency)} color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Chart currencyData={chartCurrencyData} open={chartOpen} onClose={onChartClosed} />
    </>
  );
};
