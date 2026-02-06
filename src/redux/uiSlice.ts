import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const Table = {
  A: "Table A",
  B: "Table B",
} as const;

type UIState = {
  currentTable: string;
};

const initialState: UIState = {
  currentTable: Table.A,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeTable: (state, action: PayloadAction<string>) => {
      state.currentTable = action.payload;
    },
  },
});

export const { changeTable } = uiSlice.actions;

export default uiSlice.reducer;
