/**
 * Student Guide:
 * This file exposes typed Redux hooks for the app.
 * It wraps `useDispatch` and `useSelector` with project-specific types,
 * so screens and components can read and update Redux state safely.
 * This is a common TypeScript pattern in Redux projects and worth understanding well.
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Exposes a typed dispatch hook so screens can dispatch note actions without casting.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Exposes a typed selector hook so screens get strong types from Redux state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
