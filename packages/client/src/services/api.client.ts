import ky from "ky";

function getCookie(name: string) {
  const cookies = window.document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

const Authorization = getCookie("user-session");

export const client = ky.extend({
  headers: {
    ...(Authorization && { Authorization }),
  },
});
