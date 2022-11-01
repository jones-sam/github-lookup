import axios from "axios";

const BASE_URL = "https://api.github.com";

interface GithubUser {
  avatar_url: string;
  followers: number;
  following: number;
  name: string;
  bio: string;
}

export const getGithubUser = async (username: string): Promise<GithubUser> => {
  const res = await axios.get(`${BASE_URL}/users/${username}`);
  const data: GithubUser = res.data;
  return data;
};
