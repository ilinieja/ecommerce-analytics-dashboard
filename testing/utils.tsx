import React, { PropsWithChildren } from "react";
import { Provider as StoreProvider } from "react-redux";

import "@/styles/globals.css";

import { AppState, store as appStore } from "../store/store";

export interface TestStoreProviderProps {
  store?: AppState;
}

export function ComponentTestWrapper({
  children,
  store = appStore,
}: PropsWithChildren<TestStoreProviderProps>) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: "Open Sans", sans-serif;
        }
      `}</style>
      <StoreProvider store={store}>{children}</StoreProvider>
    </>
  );
}
