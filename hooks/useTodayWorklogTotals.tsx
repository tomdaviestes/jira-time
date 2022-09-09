import useWorklogTotal from "./useWorklogTotal";

export default function useTodayWorklogTotals() {
  const now = new Date();
  const { year, month, day } = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };

  const currentDayTotal = useWorklogTotal({ year, month, day });
  const previousDayTotal = useWorklogTotal({ year, month, day: day - 1 });
  const currentMonthTotal = useWorklogTotal({ year, month });
  const previousMonthTotal = useWorklogTotal({ year, month: month - 1 });

  return {
    currentDayTotal,
    previousDayTotal,
    currentMonthTotal,
    previousMonthTotal,
  };
}