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
      const encodeId = JSON.parse(encodeIdAlbum);
      setId(encodeId);
    }
  }, [encodeIdAlbum]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading } = useSWR(
    apiUrl + `/detailplaylist?id=${encodeIdPlaylist ? encodeIdPlaylist : id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading };
}

export default useGetDetailPlaylist;
