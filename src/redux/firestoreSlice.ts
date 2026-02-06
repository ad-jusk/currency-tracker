import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebase/firebase";
import type { RootState } from "./store";

export type Currency = {
  id: string;
  date: string;
  currency: string;
  code: string;
  mid: number;
};

type FirestoreState = {
  currenciesA: Currency[];
  currenciesAMostRecent: Currency[];
  isLoading: boolean;
  error?: Error;
};

const initialState: FirestoreState = {
  currenciesA: [],
  currenciesAMostRecent: [],
  isLoading: true,
  error: undefined,
};

const roundMid = (mid: number, dc: number): number => parseFloat(mid.toFixed(dc));

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
        state.isLoading = false;
      })
      .addCase(getTableADataAsync.fulfilled, (state, action: PayloadAction<Currency[]>) => {
        if (action.payload.length === 0) {
          state.error = new Error("No currencies in database");
          state.isLoading = false;
          return;
        }
        const maxDate = action.payload.reduce((max, currency) => {
          return currency.date > max ? currency.date : max;
        }, action.payload[0].date);
        const mostRecent = action.payload.filter((currency) => currency.date === maxDate);

        state.currenciesA = action.payload;
        state.currenciesAMostRecent = mostRecent;
        state.isLoading = false;
      });
  },
});

export const getTableADataAsync = createAsyncThunk<Currency[], void, { state: RootState }>(
  "firestore/getTableADataAsync",
  async () => {
    const col = collection(db, "table_A");
    const snapshot = await getDocs(col);
    const currencies: Currency[] = snapshot.docs
      .map((doc) => {
        return { ...doc.data(), id: doc.id } as Currency;
      })
      .map((currency) => {
        return { ...currency, mid: roundMid(currency.mid, 4) };
      });
    return currencies;
  },
  {
    condition: (_, { getState }) => {
      const { firestore } = getState();
      return firestore.currenciesA.length == 0 || firestore.currenciesAMostRecent.length == 0;
    },
  }
);

export default firestoreSlice.reducer;
