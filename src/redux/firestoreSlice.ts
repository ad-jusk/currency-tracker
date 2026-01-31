import { createSlice } from "@reduxjs/toolkit";
import type { Firestore } from "firebase/firestore/lite";
import db from "../firebase/firebase";

type CurrencyA = {
  id: string;
  date: string;
  currency: string;
  code: string;
  mid: number;
};

type FirestoreState = {
  db: Firestore;
  isLoading: boolean;
  currenciesA: CurrencyA[];
};

const initialState: FirestoreState = {
  db,
  isLoading: true,
  currenciesA: [],
};

const firestoreSlice = createSlice({
  name: "firestore",
  initialState,
  reducers: {
    getData: () => {
      // TODO
    },
  },
});

export const { getData } = firestoreSlice.actions;
export default firestoreSlice.reducer;
