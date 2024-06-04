"use client";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { MusicContext } from "../components/ContextMusic/ContextMusic";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
function useGetDetailPlaylist() {
  const { encodeIdPlaylist } = useContext(MusicContext);

  const [id, setId] = useState("");
  const encodeIdAlbum = localStorage.getItem("encodeIdAlbum");
  useEffect(() => {
    if (encodeIdAlbum) {
      try {
        const encodeId = JSON.parse(encodeIdAlbum);
        setId(encodeId);
      } catch (err) {
        console.log(err);
      }
    }
  }, [encodeIdAlbum]);
  const idPlaylist = encodeIdPlaylist ? encodeIdPlaylist : id;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading, mutate, isValidating } = useSWR(
    apiUrl + `/detailplaylist?id=${idPlaylist}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, isLoading, mutate, isValidating };
}

export default useGetDetailPlaylist;
