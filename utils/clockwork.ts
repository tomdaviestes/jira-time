type Worklog = {
  id: string;
  timeSpentSeconds: number;
  started: string;
  author: {
    accountId: string;
  };
  issue: {
    id: string;
  };
};

function pad(num: number) {
  return num.toString().padStart(2, "0");
}

export async function getTotalTimeSpentForRange(
  clockworkApiKey: string,
  accountId: string,
  date: { year: number; month?: number; day?: number },
) {
  const params = new URLSearchParams({
    user_query: accountId,
    starting_at: `${date.year}-${pad(date.month ?? 1)}-${pad(date.day ?? 1)}`,
    ending_at: `${date.year}-${pad(date.month ?? 12)}-${pad(date.day ?? 31)}`,
  });


  const url = `https://api.clockwork.report/v1/worklogs?${params}`;

  const response = await fetch(
    url,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${clockworkApiKey}`,
      },
    }
  );

  const worklogs = await response.json() as Worklog[];
  const totalTimeSpentSeconds = worklogs.reduce((acc, worklog) => {
    return acc + worklog.timeSpentSeconds;
  }, 0);

  return totalTimeSpentSeconds;
}



