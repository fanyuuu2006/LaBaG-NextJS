import { Request, Response } from 'express';

export const CommitScore = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未提供 idToken' });
  }

  const idToken = authHeader.split(' ')[1]; // 取得 idToken
  const googleUserInfoUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`;

  try {
    // 🔹 驗證 idToken 是否有效
    const googleResponse = await fetch(googleUserInfoUrl);
    if (!googleResponse.ok) {
      return res.status(401).json({ message: 'idToken 無效或過期' });
    }

    const userInfo = await googleResponse.json();

    // 🔹 解析使用者資訊
    const googleUserID = userInfo.sub; // Google 的 User ID

    const { UserID, Name, Score, JsonData } = req.body;

    if (!UserID || !Name || !Score) {
      return res.status(400).json({ message: '缺少UserID、Name 或 Score' });
    }

    // 🔹 確保提交的 UserID 符合 Google 驗證的 ID
    if (UserID !== googleUserID) {
      return res.status(403).json({ message: 'UserID 不匹配' });
    }

    const formData = new URLSearchParams();
    formData.append('entry.1181479366', UserID);
    formData.append('entry.868955826', Name);
    formData.append('entry.413238880', String(Score));
    formData.append('entry.255424064', JSON.stringify(JsonData));

    const response = await fetch(process.env.GOOGLE_FORM_RECORD ?? '', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (response.status === 204 || response.ok) {
      return res.status(200).json({ message: '成功提交分數' });
    } else {
      return res.status(response.status).json({
        message: `提交失敗，回應狀態: ${response.status}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: `伺服器錯誤，無法提交分數: ${error}` });
  }
};
