'use client';
import { configureStore } from "@reduxjs/toolkit";
import globalState from "./globalState";

const store = configureStore({
    reducer: {
        globalState
    }
})

export default store