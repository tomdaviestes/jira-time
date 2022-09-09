import { useEffect, useState } from "react";

type WorklogDate = {
  year: number;
  month?: number;
  day?: number;
};

type WorklogTotal = {
  hours: number;
  minutes: number;
};

export default function useWorklogTotal({ year, month, day }: WorklogDate): WorklogTotal {
  const [worklogTotal, setWorklogTotal] = useState<WorklogTotal>({ hours: -1, minutes: -1 });

  useEffect(() => {
    const getWorklogTotal = async () => {
      const params = new URLSearchParams({
        year: year.toString(),
        month: month?.toString() ?? "",
        day: day?.toString() ?? "",
      });

      const response = await fetch(`/api/totals?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const timeSpent = await response.json();
      setWorklogTotal(timeSpent);
    };

    getWorklogTotal();
  }, [year, month, day]);

  return worklogTotal;
}
