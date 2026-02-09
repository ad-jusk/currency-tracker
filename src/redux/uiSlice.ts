import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const Table = {
  A: "Table A",
  B: "Table B",
} as const;

type UIState = {
  currentTable: string;
  searchPhrase: string;
};

const initialState: UIState = {
  currentTable: Table.A,
  searchPhrase: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeTable: (state, action: PayloadAction<string>) => {
      state.currentTable = action.payload;
    },
    setSearchPhrase: (state, action: PayloadAction<string>) => {
      state.searchPhrase = action.payload;
    },
  },
});

export const { changeTable, setSearchPhrase } = uiSlice.actions;

export default uiSlice.reducer;
