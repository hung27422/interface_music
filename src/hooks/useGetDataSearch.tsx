"use client";
import { useContext } from "react";
import useSWR from "swr";
import { MusicContext } from "../components/ContextMusic/ContextMusic";
import useDebounce from "./useDebounce";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
function useGetDataSearch() {
  const { resultSearch } = useContext(MusicContext);
  const debounceValue = useDebounce(resultSearch, 500);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading } = useSWR(
    apiUrl + `/search?keyword=${debounceValue}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading };
}

export default useGetDataSearch;
