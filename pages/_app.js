import React from "react";
import { UserProvider } from "../lib/authContext";
function MyApp({ Component, pageProps }) {
  // const initialUserValue = { user: null, loading: false }; // or an appropriate default
  return (
    // <UserProvider value={initialUserValue}>
    <Component {...pageProps} />
    // </UserProvider>
  );
}

export default MyApp;
