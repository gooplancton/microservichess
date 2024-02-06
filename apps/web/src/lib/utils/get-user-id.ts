import Cookies from "js-cookie";
import { AUTH_COOKIE_NAME } from "../../constants";

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

export function getUserId() {
  const token = Cookies.get(AUTH_COOKIE_NAME);
  if (!token) return undefined;

  const parsed = parseJwt(token);

  return parsed?.sub as string;
}
