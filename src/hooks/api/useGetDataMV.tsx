"use client";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { MusicContext } from "../../components/ContextMusic/ContextMusic";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
function useGetDataMV() {
  const { encodeIdSong } = useContext(MusicContext);
  const [id, setId] = useState("");
  const encodeIdVideo =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("encodeId")
      : null;
  useEffect(() => {
    if (encodeIdVideo) {
      try {
        const encodeId = JSON.parse(encodeIdVideo);
        setId(encodeId);
      } catch (err) {
        console.log(err);
      }
    }
  }, [encodeIdVideo]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading } = useSWR(
    apiUrl + `/video?id=${encodeIdSong ? encodeIdSong : id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading };
}

export default useGetDataMV;
