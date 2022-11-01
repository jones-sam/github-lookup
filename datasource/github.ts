import axios from "axios";

const BASE_URL = "https://api.github.com";

export interface GithubUser {
  avatar_url: string;
  followers: number;
  following: number;
  name: string;
  bio: string;
}

export interface GithubFollower {
  login: string;
  avatar_url: string;
}

export const getGithubUser = async (username: string): Promise<GithubUser> => {
  const res = await axios.get(`${BASE_URL}/users/${username}`);
  const data: GithubUser = res.data;
  return data;
};

export const getFollowers = async (
  username: string
): Promise<GithubFollower[]> => {
  const res = await axios.get(`${BASE_URL}/users/${username}/followers`);
  const data: GithubFollower[] = res.data;
  return data;
};

export const getFollowing = async (
  username: string
): Promise<GithubFollower[]> => {
  const res = await axios.get(`${BASE_URL}/users/${username}/following`);
  const data: GithubFollower[] = res.data;
  return data;
};
