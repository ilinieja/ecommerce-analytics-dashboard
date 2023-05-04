import React, { PropsWithChildren } from "react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider as StoreProvider } from "react-redux";

import { AppState, RootState, rootReducer } from "../store/store";

export interface TestStoreProviderProps {
  preloadedState?: PreloadedState<RootState>;
  store?: AppState;
}

export function TestStoreProvider({
  children,
  preloadedState = {},
  store = configureStore({ reducer: rootReducer, preloadedState }),
}: PropsWithChildren<TestStoreProviderProps>) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
