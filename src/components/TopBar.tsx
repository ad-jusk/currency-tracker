import { Autocomplete, Box, TextField } from "@mui/material";
import type { ReactElement } from "react";
import { changeTable, setSearchPhrase, Table } from "../redux/uiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const TopBar = (): ReactElement => {
  const { currentTable } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

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
          options={[Table.A]}
          sx={{ width: { xs: 150, sm: 200, md: 300, lg: 350 } }}
          value={currentTable}
          onChange={(_, newValue) => {
            dispatch(changeTable(newValue));
          }}
          renderInput={(params) => <TextField {...params} label="Select table" />}
        />
        <TextField
          onChange={(e) => {
            dispatch(setSearchPhrase(e.target.value));
          }}
          label="Search"
          sx={{ width: { xs: 150, sm: 200, md: 300, lg: 350 } }}
        />
      </Box>
    </Box>
  );
};
