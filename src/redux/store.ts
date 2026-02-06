import { configureStore } from "@reduxjs/toolkit";
import firestoreReducer from "./firestoreSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    firestore: firestoreReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
