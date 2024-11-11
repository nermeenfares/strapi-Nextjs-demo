// import localFont from "next/font/local";
// import "../styles/globals.css";
import Head from "next/head";
import Nav from "./Nav";
import { UserProvider } from "../lib/authContext";

export default function RootLayout({ user, loading = false, children }) {
  return (
    <UserProvider value={{ user, loading }}>
      <Head>
        <title>film database</title>
      </Head>
      <Nav />
      <main className="px-4">
        <div className="flex justify-center items-center bg-white my-16 p-16 rounded-lg">
          <div className="text-2xl font-medium">{children}</div>
        </div>
      </main>
    </UserProvider>
  );
}
