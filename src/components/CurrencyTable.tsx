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
import {
  getFilteredACurrencies,
  getFilteredBCurrencies,
  getTableADataAsync,
  getTableBDataAsync,
  type Currency,
} from "../redux/firestoreSlice";
import { Table as T } from "../redux/uiSlice";
import { ChartButton } from "./ChartButton";
import { Chart } from "./Chart";
import { useSelector } from "react-redux";

export const CurrencyTable = (): ReactElement => {
  const { currentTable } = useAppSelector((state) => state.ui);
  const { currenciesA, currenciesB, isLoading, error } = useAppSelector((state) => state.firestore);
  const filteredACurrencies = useSelector(getFilteredACurrencies);
  const filteredBCurrencies = useSelector(getFilteredBCurrencies);
  const dispatch = useAppDispatch();

  const [chartOpen, setChartOpen] = useState(false);
  const [chartCurrencyData, setChartCurrencyData] = useState<Currency[]>([]);

  useEffect(() => {
    if (currentTable === T.A) {
      dispatch(getTableADataAsync());
    } else if (currentTable === T.B) {
      dispatch(getTableBDataAsync());
    }
  }, [currentTable]);

  const onChartClicked = useCallback(
    (currency: Currency): void => {
      if (currentTable === T.A) {
        setChartCurrencyData(currenciesA[currency.code]);
      } else if (currentTable === T.B) {
        setChartCurrencyData(currenciesB[currency.code]);
      } else {
        setChartCurrencyData([]);
      }
      setChartOpen(true);
    },
    [currenciesA, currenciesB, currentTable]
  );

  const onChartClosed = useCallback(() => {
    setChartOpen(false);
    setChartCurrencyData([]);
  }, []);

  const getFilteredCurrencies = (): Currency[] => {
    if (currentTable === T.A) {
      return filteredACurrencies;
    } else if (currentTable === T.B) {
      return filteredBCurrencies;
    }
    return [];
  };

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
            {getFilteredCurrencies().map((currency) => (
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
                  <ChartButton onClick={() => onChartClicked(currency)} color="primary" />
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
