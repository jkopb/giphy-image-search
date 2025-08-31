import { useQuery } from "@tanstack/react-query";
import { GiphyData, GiphyResponse, GiphyPagination } from "./giphy-data.types";

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

if (!GIPHY_API_KEY) {
  throw new Error("VITE_GIPHY_API_KEY environment variable is required");
}

interface GiphyDataWithPagination {
  data: GiphyData[];
  pagination: GiphyPagination;
  hasNextPage: boolean;
}

const fetchGiphyData = async (query: string, limit: number, offset: number = 0): Promise<GiphyDataWithPagination> => {
  const url = new URL("https://api.giphy.com/v1/stickers/search");
  url.searchParams.append("q", query);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("rating", "g");
  url.searchParams.append("api_key", GIPHY_API_KEY);

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Giphy API error: ${response.status} ${response.statusText}`);
  }
  
  const data: GiphyResponse = await response.json();
  
  if (data.meta.status !== 200) {
    throw new Error(`Giphy API error: ${data.meta.msg}`);
  }
  
  return {
    data: data.data,
    pagination: data.pagination,
    hasNextPage: data.pagination.offset + data.pagination.count < data.pagination.total_count,
  };
};

const useGiphyData = (query: string, limit: number = 25, offset: number = 0) => {
  return useQuery({
    queryKey: ["giphy", "stickers", query, limit, offset],
    queryFn: () => fetchGiphyData(query, limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: query.trim().length > 0,
    refetchOnWindowFocus: false,
  });
};

export default useGiphyData;