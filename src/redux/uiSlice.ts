import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const Table = {
  A: "Table A",
  B: "Table B",
} as const;

type UIState = {
  currentTable: string;
  searchPhraseA: string;
  searchPhraseB: string;
};

const initialState: UIState = {
  currentTable: Table.A,
  searchPhraseA: "",
  searchPhraseB: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeTable: (state, action: PayloadAction<string>) => {
      state.currentTable = action.payload;
    },
    setSearchPhraseA: (state, action: PayloadAction<string>) => {
      state.searchPhraseA = action.payload;
    },
    setSearchPhraseB: (state, action: PayloadAction<string>) => {
      state.searchPhraseB = action.payload;
    },
  },
});

export const { changeTable, setSearchPhraseA, setSearchPhraseB } = uiSlice.actions;

export default uiSlice.reducer;
