import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token";
import profileReducer from "./profileURL";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
