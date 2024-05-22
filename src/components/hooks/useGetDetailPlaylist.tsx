"use client";
import { useContext } from "react";
import useSWR from "swr";
import { MusicContext } from "../ContextMusic/ContextMusic";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
function useGetDetailPlaylist() {
  const { encodeIdPlaylist } = useContext(MusicContext);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = useSWR(
    apiUrl + `/detailplaylist?id=${encodeIdPlaylist}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data };
}

export default useGetDetailPlaylist;
