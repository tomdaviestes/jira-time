import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { addWorklog, getWorklogs } from "@utils/jira";

const AddWorkLogBodySchema = z.object({
  timeSpentSeconds: z.number().int().positive(),
  started: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jiraHost = req.cookies.jiraHost ?? "";
  const accountId = req.cookies.accountId ?? "";
  const jiraApiKey = req.cookies.jiraApiKey ?? "";
  const { issueKeyOrId } = req.query;
  
  if (req.method === "GET") {
    return res.json(await getWorklogs(jiraHost, accountId, jiraApiKey, issueKeyOrId as string));
  }

  if (req.method === "POST") {
    try {
      const options = AddWorkLogBodySchema.parse(req.body);
      return res.json(await addWorklog(jiraHost, accountId, jiraApiKey, issueKeyOrId as string, options));
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  return res.status(405).end();
}