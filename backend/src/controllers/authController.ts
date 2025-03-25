import { Request, Response } from "express";
import { Profile } from "passport-google-oauth20";
import { generateToken } from "../utils/jwt";
import { User } from "../types/user";

// Google 登入回調
export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as Profile;

    const response = await fetch(`${process?.env?.BACKEND_URL}/sheet/getUsers`);
    if (!response.ok) throw new Error("獲取用戶列表失敗");

    const userRows: string[][] = await response.json();
    const userIndex: number = userRows.findIndex(
      (row) => Array.isArray(row) && row.length > 1 && row[1] === user.id
    );

    const userData: User = {
      id: user.id,
      name: userIndex !== -1 ? userRows[userIndex][2] : user.displayName,
      email:
        userIndex !== -1
          ? userRows[userIndex][3]
          : user.emails?.[0].value ?? "",
      image:
        userIndex !== -1
          ? userRows[userIndex][4]
          : user.photos?.[0].value ?? "",
    };

    const token = generateToken(userData);

    // 若該用戶不在記錄中，則添加
    if (userIndex === -1) {
      const addUserResponse = await fetch(
        `${process?.env?.BACKEND_URL}/sheet/addUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!addUserResponse.ok) {
        const errorMessage = await addUserResponse.json();
        throw new Error(errorMessage);
      }
    }

    // 將 Token 傳給前端
    res.redirect(`${process.env.WEBSITE_URL}/login-success?token=${token}`);
  } catch (error) {
    console.error("伺服器出現錯誤: ", error);
    res.redirect(`${process.env.WEBSITE_URL}/Login`);
  }
};

// 獲取用戶資料
export const getUserProfile = (req: Request, res: Response) => {
  const user = req.user as User;

  if (!user) {
    res.status(401).json({ message: "未登入或無效的身份驗證" });
    return;
  }

  res.status(200).json(user);
};
