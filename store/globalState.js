"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHamburgerMenuActive: false,
};

const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    changeHamburgerMenuState: (state, action) => {
      state.isHamburgerMenuActive = !state.isHamburgerMenuActive;
    },
  },
});

export const {
  changeHamburgerMenuState,
} = globalState.actions;
export default globalState.reducer;