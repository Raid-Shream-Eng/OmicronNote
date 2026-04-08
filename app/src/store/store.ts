/**
 * Student Guide:
 * This file creates the Redux store used by the whole app.
 * It registers reducers, exports the main store types, and attaches persistence registration.
 * Try to think of this file as the "store wiring" layer, not the place for feature business logic.
 * When the app gets bigger, this file should stay fairly short and predictable.
 */
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
// Imports the notes reducer from the notes feature so store wiring stays thin and feature-oriented.
import notesReducer from "../features/notes/state/notesSlice";
import { registerStorePersistence } from "./registerPersistence";

// Registers every reducer the app currently uses.
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer,
  },
});

// Exposes the Redux root state type to typed selectors and screens.
export type RootState = ReturnType<typeof store.getState>;

// Exposes the configured store type to bootstrap and persistence helpers.
export type AppStore = typeof store;

// Exposes the Redux dispatch type to typed dispatch hooks and screens.
export type AppDispatch = typeof store.dispatch;

// Attaches persistence after store creation so store.ts no longer owns persistence details directly.
registerStorePersistence(store);
