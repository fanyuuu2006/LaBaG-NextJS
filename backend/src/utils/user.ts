import { Profile as GoogleProfile } from "passport-google-oauth20";
import { Profile as GitHubProfile } from "passport-github2";
import { authUser } from "../types/user";
import { generateToken } from "./jwt";

export const extractUserData = (
  user: GitHubProfile | GoogleProfile
): authUser => ({
  id: user.id,
  name: user.displayName,
  email: user.emails?.[0].value || "",
  image: user.photos?.[0].value || "",
});

export const checkAndAddUser = async (user: authUser): Promise<string> => {
  const response = await fetch(`${process.env.BACKEND_URL}/sheet/getUsers`);
  if (!response.ok) throw new Error("獲取用戶列表失敗");

  const userRows: string[][] = await response.json();
  const existingUser = userRows.find((row) => row?.[1] === user.id);

  const userData: authUser = {
    id: user.id,
    name: existingUser?.[2] || user.name,
    email: existingUser?.[3] || user.email,
    image: existingUser?.[4] || user.image,
  };

  const token = generateToken(userData);

  if (!existingUser) {
    const addUserResponse = await fetch(
      `${process.env.BACKEND_URL}/sheet/addUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!addUserResponse.ok) throw new Error(await addUserResponse.json());
  }

  return token;
};
