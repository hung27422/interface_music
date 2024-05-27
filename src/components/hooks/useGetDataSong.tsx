"use client";
import { useContext } from "react";
import useSWR from "swr";
import { MusicContext } from "../ContextMusic/ContextMusic";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
function useGetDataSong() {
  const { encodeIdSong } = useContext(MusicContext);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading } = useSWR(
    apiUrl + `/song?id=${encodeIdSong}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading };
}

export default useGetDataSong;
