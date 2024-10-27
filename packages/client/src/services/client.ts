import axios from "axios";
import useSWR from "swr";

if (!process.env.NEXT_PUBLIC_SERVER_URL)
  throw new Error("SERVER_URL env not set.");

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

console.log(process.env.NEXT_PUBLIC_SERVER_URL);

export const fetcher = (url: string) => client.get(url).then((res) => res.data);
