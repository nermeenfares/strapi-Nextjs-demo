import RootLayout from "../components/layout";
import { useFetchUser } from "../lib/authContext";

export default function Home() {
  const { user, loading } = useFetchUser();
  return (
    <RootLayout user={user}>
      <h1>heloooooooooo world</h1>
    </RootLayout>
  );
}
