import { NextApiRequest, NextApiResponse } from "next";
import { getTotalTimeSpentForRange } from "@utils/clockwork";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clockworkApiKey = req.cookies.clockworkApiKey ?? "";
  const accountId = req.cookies.accountId ?? "";
  const { year, month, day } = req.query;

  const date = {
    year: parseInt(year as string),
    month: month ? parseInt(month as string) : undefined,
    day: day ? parseInt(day as string) : undefined,
  };

  const totalTimeSpentSeconds = await getTotalTimeSpentForRange(
    clockworkApiKey,
    accountId,
    date,
  );

  const hours = Math.floor(totalTimeSpentSeconds / 3600);
  const minutes = Math.floor((totalTimeSpentSeconds % 3600) / 60);

  res.json({ hours, minutes });
}