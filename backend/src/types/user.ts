import { Profile as GoogleProfile } from "passport-google-oauth20";
import { Profile as GitHubProfile } from "passport-github2";

export type signOptions = "google" | "github";

export type signProfiles = GoogleProfile & GitHubProfile;

export type authUser = {
  id: signProfiles["id"];
  name?: signProfiles["displayName"];
  email?: string;
  image?: string;
};

export type dataUserColumns = keyof authUser | "time";

export const dataUserIndex: Record<dataUserColumns, number> = {
  time: 0,
  id: 1,
  name: 2,
  email: 3,
  image: 4,
};
