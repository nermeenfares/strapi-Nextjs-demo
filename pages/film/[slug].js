import Cookies from "js-cookie";
import RootLayout from "../../components/layout";
import fetcher from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Film({ film }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(Cookies.get("jwt"));
  }, []);

  if (!film) {
    return <h1>No film fetched</h1>;
  }

  return (
    <RootLayout>
      <div>
        <h1 className="text-black">
          {film.attributes.title || "No title available"}
        </h1>
      </div>
    </RootLayout>
  );
}

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const jwt = getTokenFromServerCookie(req);

  const filmResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?filters[slug][$eq]=${slug}`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : {}
  );

  console.log("Film Response:", filmResponse);

  return {
    props: {
      film: filmResponse.data ? filmResponse.data : null,
    },
  };
}
