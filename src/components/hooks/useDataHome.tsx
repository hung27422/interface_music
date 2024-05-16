"use client";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
function useDataHome() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = useSWR(apiUrl + "/home", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data };
}

export default useDataHome;
