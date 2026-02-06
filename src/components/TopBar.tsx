import { Autocomplete, Box, TextField } from "@mui/material";
import type { ReactElement } from "react";
import { changeTable, Table } from "../redux/uiSlice";
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
      <Box sx={{ width: 1, display: "flex" }}>
        <p>Currency tracker</p>
      </Box>
      <Autocomplete
        disablePortal
        disableClearable
        options={[Table.A]}
        sx={{ width: 300 }}
        value={currentTable}
        onChange={(_, newValue) => {
          dispatch(changeTable(newValue));
        }}
        renderInput={(params) => <TextField {...params} label="Select table" />}
      />
    </Box>
  );
};
