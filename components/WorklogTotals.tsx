import useTodayWorklogTotals from "hooks/useTodayWorklogTotals";
import Spinner from "components/Spinner";

type TotalCardProps = {
  label: string;
  timeSpent: {
    hours: number;
    minutes: number;
  },
  requiredHours?: number;
};

function TotalCard({ label, timeSpent: { hours, minutes }, requiredHours }: TotalCardProps) {
  const timeClasses = `
    text-base-content
    font-bold
    text-2xl
    md:text-4xl
    ${requiredHours && hours >= requiredHours ? "text-success" : ""}
    ${requiredHours && hours < requiredHours ? "text-error" : ""}
  `;

  const timeUnitClasses = "opacity-80 text-sm uppercase";

  return (
    <div
      className="card text-center flex-grow bg-base-200"
      style={{
        maxWidth: "calc(50% - 0.5rem)",
      }}
    >
      <div className="card-body">
        <p className="card-subtitle text-base-content text-md font-semibold uppercase">{label}</p>
        <p
          className={timeClasses}
        >
          { hours > -1 && (
            <span>{hours}<span className={timeUnitClasses}>h</span> {minutes}<span className={timeUnitClasses}>m</span></span>
          )}
          { hours === -1 && (
            <Spinner />
          )}
        </p>
      </div>
    </div>
  );
}

export default function WorklogTotals() {
  const {
    currentDayTotal, previousDayTotal, currentMonthTotal, previousMonthTotal,
  } = useTodayWorklogTotals();

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center mb-4 gap-4">
        <TotalCard label="Yesterday" timeSpent={previousDayTotal} requiredHours={5} />
        <TotalCard label="Today" timeSpent={currentDayTotal} requiredHours={5} />
      </div>

      <div className="flex flex-row flex-wrap justify-center mb-4 gap-4">
        <TotalCard label="Last month" timeSpent={previousMonthTotal} requiredHours={100} />
        <TotalCard label="This month" timeSpent={currentMonthTotal} requiredHours={100} />
      </div>
    </>
  )
}