import { useQuery } from "react-query";
import { getGithubUser } from "../datasource/github";

export function useGithubUserSearch(searchQuery: string) {
  return useQuery(["user", searchQuery], () => getGithubUser(searchQuery), {
    enabled: false,
    staleTime: 300000,
  });
}
