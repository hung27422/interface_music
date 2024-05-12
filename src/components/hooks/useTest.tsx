"use client";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
function useTest() {
  const { data } = useSWR(
    "http://localhost:5000/api/infosong/" + 1715330738288,
    fetcher
  );
  return { data };
}

export default useTest;
