"use client";
import { store } from "./store";
const { Provider } = require("react-redux");

export const Providers = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return <Provider store={store}>
        {children}
    </Provider>
}