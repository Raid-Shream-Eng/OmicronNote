/**
 * Student Guide:
 * This file is a simple Redux slice left from early project setup.
 * It demonstrates the core Redux Toolkit pattern: state, reducers, and exported actions.
 * Even if the counter feature is not central to the current app, it is still a useful learning example.
 * Students can compare this simple slice with the more advanced notes slice.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
