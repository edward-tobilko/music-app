import { configureStore } from "@reduxjs/toolkit";
import { shazamCoreAPI } from "../api/shazamCore";
import playerSlice from "../slices/playerSlice";

// Store
export const store = configureStore({
  reducer: {
    [shazamCoreAPI.reducerPath]: shazamCoreAPI.reducer,
    player: playerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreAPI.middleware),
});
