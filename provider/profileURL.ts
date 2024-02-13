"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfileURL } from "../src/interface";
import { RootState } from "./store";
import Cookies from "universal-cookie";

interface URLState {
  profileURL: IProfileURL | null;
}

const cookie = new Cookies();
const initialState: URLState = {
  profileURL: cookie.get("userLoggedProfile"),
};

const profileSlice = createSlice({
  name: "profileURL",
  initialState,
  reducers: {
    setProfileURL: (state, action: PayloadAction<IProfileURL>) => {
      state.profileURL = action.payload;
    },
  },
});

export const { setProfileURL } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.profile;
export default profileSlice.reducer;
