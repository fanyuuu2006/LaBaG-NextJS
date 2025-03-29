import { authUser, signProfiles } from "../types/auth";
import { generateToken } from "./jwt";

export const extractUserData = (user: signProfiles): authUser => ({
  id: user.id,
  name: user.displayName,
  email: user.emails?.[0].value || "",
  image: user.photos?.[0].value || "",
});

export const checkAndAddUser = async (user: authUser): Promise<string> => {
  const response = await fetch(`${process.env.BACKEND_URL}/data/users`);
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
      `${process.env.BACKEND_URL}/data/users`,
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
