import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { Provider as StoreProvider } from "react-redux";

const font = Open_Sans({ subsets: ["latin"] });

import "@/styles/globals.css";
import { getDashboardLayout } from "@/layouts/DashboardLayout/DashboardLayout";

import { store } from "../store/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const renderWithLayout = Component.getLayout || getDashboardLayout;

  return renderWithLayout(
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}
