import React, { PropsWithChildren } from "react";
import { Provider as StoreProvider } from "react-redux";

import { AppState, store as appStore } from "../store/store";

export interface TestStoreProviderProps {
  store?: AppState;
}

export function TestStoreProvider({
  children,
  store = appStore,
}: PropsWithChildren<TestStoreProviderProps>) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
