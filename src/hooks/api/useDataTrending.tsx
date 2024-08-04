import useSWR from "swr";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
function useDataTrending() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, isLoading } = useSWR(apiUrl + "/newreleasechart", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, isLoading };
}

export default useDataTrending;
