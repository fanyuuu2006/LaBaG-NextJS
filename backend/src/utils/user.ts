import { authUser, signProfiles } from "../types/auth";
import { generateToken } from "./jwt";

export const extractUserData = (user: signProfiles): authUser => ({
  id: user.id,
  name: user.displayName,
  email: user.emails?.[0].value || "",
  image: user.photos?.[0].value || "",
});

export const checkAndAddUser = async (user: authUser): Promise<string> => {
  try {
    // 直接檢查特定 ID，而不是取得整個列表
    const response = await fetch(
      `${process.env.BACKEND_URL}/data/users/${user.id}`
    );

    if (response.ok) {
      const existingUser = (await response.json()) as authUser;
      return generateToken(existingUser);
    }

    if (response.status !== 404) {
      throw new Error(await response.json());
    }

    // 如果用戶不存在，新增用戶
    const token = generateToken(user);
    const addUserResponse = await fetch(
      `${process.env.BACKEND_URL}/data/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    );

    if (!addUserResponse.ok) {
      const errorResponse = await addUserResponse.json();
      throw new Error(errorResponse.message || "新增用戶失敗");
    }

    return token;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}`
    );
  }
};
