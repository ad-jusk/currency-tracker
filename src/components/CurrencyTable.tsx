import { useCallback, useEffect, type ReactElement } from "react";
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

export const CurrencyTable = (): ReactElement => {
  const { currentTable } = useAppSelector((state) => state.ui);
  const { currenciesAMostRecent, isLoading, error } = useAppSelector((state) => state.firestore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentTable === T.A) {
      dispatch(getTableADataAsync());
    }
  }, [currentTable]);

  const onChartClicked = useCallback((currency: Currency): void => {
    console.log(currency.code, "clicked");
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
    <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
      <Table
        sx={{
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
  );
};
