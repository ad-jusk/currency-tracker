import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { changeTable, setSearchPhraseA, setSearchPhraseB, Table } from "../redux/uiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ClearButton } from "./ClearButton";

export const TopBar = (): ReactElement => {
  const { currentTable, searchPhraseA, searchPhraseB } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        currentTable === Table.A ? setSearchPhraseA(localSearch) : setSearchPhraseB(localSearch)
      );
    }, 275);
    return (): void => clearTimeout(timeout);
  }, [localSearch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalSearch(currentTable === Table.A ? searchPhraseA : searchPhraseB);
  }, [currentTable]);

  const onSearchClear = useCallback(() => {
    setLocalSearch("");
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 4,
        px: 2,
      }}
    >
      <h2>Currency tracker</h2>
      <Box sx={{ display: "flex", width: 1, justifyContent: "space-evenly" }}>
        <Autocomplete
          disablePortal
          disableClearable
          options={[Table.A, Table.B]}
          sx={{ width: { xs: 150, sm: 200, md: 300, lg: 350 } }}
          value={currentTable}
          onChange={(_, newValue) => {
            dispatch(changeTable(newValue));
          }}
          renderInput={(params) => <TextField {...params} label="Select table" />}
        />
        <TextField
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          label="Search"
          sx={{ width: { xs: 150, sm: 200, md: 300, lg: 350 } }}
          slotProps={{
            input: {
              endAdornment: localSearch && (
                <InputAdornment position="end">
                  <ClearButton onClick={onSearchClear} color="primary" sx={{ p: 0 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
};
