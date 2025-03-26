import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from "passport-google-oauth20";
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from "passport-github2";

interface DoneCallback {
  (err: any, user?: any): void;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: `${process.env.BACKEND_URL}/auth/callback/google`,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: DoneCallback
    ) => {
      return done(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      callbackURL: `${process.env.BACKEND_URL}/auth/callback/github`,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: DoneCallback
    ) => {
      return done(null, profile);
    }
  )
);

export default passport;
