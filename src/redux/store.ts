import { configureStore } from "@reduxjs/toolkit";
import firestoreReducer from "./firestoreSlice";

export const store = configureStore({
  reducer: {
    firestore: firestoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
