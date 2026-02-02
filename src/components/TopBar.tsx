import { Autocomplete, Box, TextField } from "@mui/material";
import type { ReactElement } from "react";

export const TopBar = (): ReactElement => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <p>Currency tracker</p>
        <p>Source:</p>
      </Box>
      <Autocomplete
        disablePortal
        options={[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </Box>
  );
};
