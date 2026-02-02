import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebase/firebase";

type CurrencyA = {
  id: string;
  date: string;
  currency: string;
  code: string;
  mid: number;
};

type FirestoreState = {
  currenciesA: CurrencyA[];
  isLoading: boolean;
  error?: Error;
};

const initialState: FirestoreState = {
  currenciesA: [],
  isLoading: true,
  error: undefined,
};

const firestoreSlice = createSlice({
  name: "firestore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTableADataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTableADataAsync.rejected, (state, action) => {
        state.error = new Error(action.error.message);
      })
      .addCase(getTableADataAsync.fulfilled, (state, action: PayloadAction<CurrencyA[]>) => {
        state.currenciesA = action.payload;
      });
  },
});

export const getTableADataAsync = createAsyncThunk("firestore/getTableADataAsync", async () => {
  const col = collection(db, "table_A");
  const snapshot = await getDocs(col);
  const currencies: CurrencyA[] = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as CurrencyA;
  });
  return currencies;
});

export default firestoreSlice.reducer;
