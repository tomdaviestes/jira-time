import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { jiraHost, accountId, jiraApiKey, clockworkApiKey } = req.body;

  res.setHeader("Set-Cookie", [
    `jiraHost=${jiraHost}; HttpOnly; Path=/; SameSite=Strict;`,
    `accountId=${accountId}; HttpOnly; Path=/; SameSite=Strict;`,
    `jiraApiKey=${jiraApiKey}; HttpOnly; Path=/; SameSite=Strict;`,
    `clockworkApiKey=${clockworkApiKey}; HttpOnly; Path=/; SameSite=Strict;`,
  ]);

  res.redirect("/");
}