import { Profile as GoogleProfile } from "passport-google-oauth20";
import { Profile as GitHubProfile } from "passport-github2";

export type signOptions = "google" | "github";

export type signProfiles = GoogleProfile | GitHubProfile;

export type authUser = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
};
