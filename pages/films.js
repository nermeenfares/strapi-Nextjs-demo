import React, { useState } from "react";
import RootLayout from "../components/layout";
import fetcher from "../lib/api";

import useSWR from "swr";
import Films from "../components/Films";
import { useFetchUser } from "../lib/authContext";
export default function FilmsList({ films }) {
  const { user, loading } = useFetchUser();
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${pageIndex}&pagination[pageSize]=5`,
    fetcher,
    { fallBackData: films }
  );
  return (
    <RootLayout user={user}>
      <Films films={data} />
      <div>
        <button
          onClick={() => {
            setPageIndex(pageIndex - 1);
          }}
          disabled={pageIndex === 1}
        >
          previous
        </button>
        <button
          onClick={() => {
            setPageIndex(pageIndex + 1);
          }}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
        >
          Next
        </button>
        <span>{`${pageIndex} of ${
          data && data.meta.pagination.pageCount
        }`}</span>
      </div>
    </RootLayout>
  );
}

//this code is run on server to make data fetched on server and available at build time ahead of the suer's request
// export async function getServerSideProps() {}
//we gonna use swr |stale-while-revalidate | -- which is abt client-side rendering

export async function getStaticProps() {
  const filmsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=5`
  );

  console.log(filmsResponse);
  return {
    props: { films: filmsResponse.data },
  };
}
