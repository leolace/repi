import ky from "ky";

function getCookie(name: string) {
  const cookies = window.document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) return decodeURIComponent(cookieValue); // Decodifica o valor do cookie
  }
  return null; // Retorna null se o cookie não for encontrado
}

const Authorization = getCookie("user-session");

export const client = ky.extend({
  headers: {
    ...(Authorization && { Authorization }),
  },
});
