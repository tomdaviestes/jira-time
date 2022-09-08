interface AddWorklogOptions {
  timeSpentSeconds: number;
  comment?: string;
  started?: string;
}

export async function addWorklog(
  jiraHost: string,
  accountId: string,
  jiraApiKey: string,
  issueIdOrKey: string,
  options: AddWorklogOptions,
) {
  const url = `https://${jiraHost}/rest/api/3/issue/${issueIdOrKey}/worklog?notifyUsers=false&adjustEstimate=leave`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${accountId}:${jiraApiKey}`).toString("base64")}`,
    },
    body: JSON.stringify(options),
  });

  return res.json();
}

export async function getWorklogs(
  jiraHost: string,
  accountId: string,
  jiraApiKey: string,
  issueIdOrKey: string,
) {
  const url = `https://${jiraHost}/rest/api/3/issue/${issueIdOrKey}/worklog`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(`${accountId}:${jiraApiKey}`).toString("base64")}`,
    },
  });

  return res.json();
}