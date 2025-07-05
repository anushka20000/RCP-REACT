import "../css/index.scss";
import "../css/App.scss";
import "../css/style.css";

import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthContextProvider } from "../providers/auth";
import { LangContextProvider } from "../providers/language";
import { CartContextProvider } from "../providers/cart";
const {
    MeetingProvider,
    lightTheme,
} =  require('amazon-chime-sdk-component-library-react');
import { ThemeProvider } from 'styled-components';


const queryClient = new QueryClient({
    /**
     * refetchOnWindowFocus: automatically requests fresh data in the background if user leaves the app and returns to stale data.
     * refetchOnmount: if true, refetch on mount if the data is stale.
     * refetchOnReconnect: if true, refetch on reconnect if the data is stale.
     * retry: if true, failed queries will retry infinitely.
     * staleTime: the time in milliseconds after data is considered stale. Defaults to 0.
     */
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

export default function MyApp({ Component, pageProps }) {
    return (<QueryClientProvider client={queryClient}>
        <LangContextProvider>
            <AuthContextProvider>
                <CartContextProvider>
                    <ThemeProvider theme={lightTheme}>
                        <MeetingProvider>
                            <Component {...pageProps} />
                        </MeetingProvider>
                    </ThemeProvider>
                </CartContextProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </AuthContextProvider>
        </LangContextProvider>
    </QueryClientProvider>
    )
}
