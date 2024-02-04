"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IToken } from "../../interface";
import { RootState } from "../store";
import Cookies from "universal-cookie";

interface TokenState {
  token: IToken | null;
}

const cookie = new Cookies();
const initialState: TokenState = {
  token: cookie.get("userLogged"),
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<IToken>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export const tokenSelector = (state: RootState) => state.token;
export default tokenSlice.reducer;
