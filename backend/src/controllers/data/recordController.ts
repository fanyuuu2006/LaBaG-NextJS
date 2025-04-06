import { Request, Response } from "express";
import { Sheet } from "../../config/googleapi";
import { authUser } from "../../types/user";
import { gameRecord } from "../../types/record";
import { AllDataType, parseScore } from "labag";

export const getRecords = async (_: Request, res: Response) => {
  try {
    const recordResponse = await Sheet.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_LABAG_SHEET_ID,
      range: "紀錄!A:D",
    });

    const recordRows = recordResponse.data.values?.slice(1) as string[][];
    if (!recordRows) {
      console.log("獲取試算表錯誤");
      res.status(400).json({ message: "獲取試算表錯誤" });
      return;
    }

    const recordDatas: gameRecord[] = recordRows.map((row) => ({
      time: row[0],
      id: row[1],
      name: row[2],
      score: parseInt(row[3]),
    }));

    res.status(200).json(recordDatas);
    return;
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法獲取資料: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const getScoreByAllData = async (req: Request, res: Response) => {
  try {
    const allData = req.body as AllDataType;
    if (!allData) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
    }

    const score: number = parseScore(allData);

    res.status(200).json({ score });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const addRecord = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.user as authUser;
    const { score } = req.body;

    // 检查请求数据是否完整
    if (!id || !name || !score || !(typeof score === "number")) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
    }

    try {
      // 将数据添加到 Google 表格中
      await Sheet.spreadsheets.values.append({
        spreadsheetId: process?.env?.GOOGLE_LABAG_SHEET_ID,
        range: "紀錄!A:D",
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              new Date().toLocaleString("zh-TW", {
                timeZone: "Asia/Taipei",
              }),
              id,
              name,
              score, // 提交分数
            ],
          ],
        },
      });

      console.log("分數提交成功: ", id, name, score);
      res.status(200).json({ message: "添加提交分數" });
    } catch (verifyError) {
      console.error("❌ 驗證  失败:", verifyError);
      res.status(400).json({ message: "❌ 無效的 token" });
    }

    return;
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤，無法提交分數: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};
export const getRecordsById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as authUser["id"];
    const size = parseInt(req.query["size"] as string);
    if (!userId) {
      console.log("請求數據缺失或是格式錯誤");
      res.status(400).json({ message: "請求數據缺失或是格式錯誤" });
      return;
    }

    const response = await fetch(`${process.env.BACKEND_URL}/data/records`);
    if (!response.ok) {
      throw new Error(await response.json());
    }

    const recordDatass = (await response.json()) as gameRecord[];

    const userRecords =
      recordDatass
        .filter((record) => record.id === userId)
        .slice(size ? -size : 0) ?? [];

    res.status(200).json(userRecords);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};

export const getRanking = async (_: Request, res: Response) => {
  try {
    const recordsResponse = await fetch(
      `${process.env.BACKEND_URL}/data/records`
    );
    if (!recordsResponse.ok) {
      console.log("獲取紀錄資料失敗");
      throw new Error(await recordsResponse.json());
    }

    const recordDatas = (await recordsResponse.json()) as gameRecord[];
    const recordMap = new Map<authUser["id"], gameRecord>();

    recordDatas.forEach((record) => {
      const { id, score } = record;

      if (!recordMap.has(id) || score > (recordMap.get(id)?.score ?? 0)) {
        recordMap.set(id, record);
      }
    });
    const sortedData = Array.from(recordMap.values())
      .sort((a, b) => b.score - a.score)
      .map((value, index) => ({
        rank: index + 1,
        ...value,
      }));

    console.log(sortedData);
    console.log("成功獲取排行榜數據");
    res.status(200).json(sortedData);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({
      message: `伺服器錯誤: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
    return;
  }
};
