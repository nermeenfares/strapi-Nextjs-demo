import Cookies from "js-cookie";

export const setToken = (data) => {
  if (typeof window === "undefined") {
    return;
  }
  console.log("data", data.jwt);
  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);
  // if (Cookies.get("username")) {
  // window.location.reload();
  // };
};
export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");
};
export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};
export const getIdFromLocalCookie = () => {
  return Cookies.get("id");
};
export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};
export const getTokenFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("jwt="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};

export const getIdFromServerCookie = (req) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};
