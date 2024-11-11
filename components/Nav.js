import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import fetcher from "../lib/api";
import { setToken, unsetToken } from "../lib/auth";
import { useUser } from "../lib/authContext";

export default function Nav() {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });
  const { user, loading } = useUser();
  const logout = () => {
    unsetToken();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    console.log("myresssssss of login");
    //here we get the jwt
    console.log(responseData);
    setToken(responseData);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <nav className="flex  w-full  md:py-0 px-4 flex-wrap items-center justify-between py-4 text-lg text-gray-700">
      <div>
        <ul>
          <li>
            <Link href="/" passHref>
              strapi
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              films
            </Link>
          </li>
          <li>
            <Link href="/films" passHref>
              home
            </Link>
          </li>
          {!loading &&
            (user ? (
              <li>
                <Link href="/">
                  <p className="md:p-2 py-2 block ">profile</p>
                </Link>
              </li>
            ) : (
              ""
            ))}
          {!loading &&
            (user ? (
              <li>
                <a
                  className="md:p-2 py-2 block "
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  logout
                </a>
              </li>
            ) : (
              ""
            ))}
          {!loading && !user ? (
            <>
              <li>
                <form onSubmit={handleSubmit} className="form-inline">
                  <input
                    type="text"
                    name="identifier"
                    onChange={handleChange}
                    placeholder="username"
                    required
                    className="md:p-2 form-inputs py-2 rounded mx-2"
                  />
                  <input
                    required
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="password"
                    className="md:p-2 form-inputs py-2 rounded mx-2"
                  />
                  <button
                    type="submit"
                    className="md:p-2 rounded py-2 text-black bg-white"
                  >
                    login
                  </button>
                </form>
              </li>
              <li>
                <Link href="/register">
                  <p className="md:p-2 block py-2 text-black">Register</p>
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
}
