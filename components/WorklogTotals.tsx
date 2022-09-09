import useTodayWorklogTotals from "hooks/useTodayWorklogTotals";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div
      className="inline-block m-2 w-6 h-6 border-4 rounded-full border-primary spinner"
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  </div>
);

const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-error"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
);

type WorklogStatsProps = {
  label: string;
  timeSpent: {
    hours: number;
    minutes: number;
  },
  requiredHours?: number;
};

function WorklogStats({ label, timeSpent: { hours, minutes }, requiredHours }: WorklogStatsProps) {
  return (
    <div
      className="stat"  
      style={{
        maxWidth: "calc(50% - 0.5rem)",
      }}
    >
      <div className="stat-title mb-1">{label}</div>
      <div className="stat-value">
        { hours > -1 ? (
          <div className="flex flex-row">
            <span>{hours}<span className="uppercase text-sm">h</span> {minutes}<span className="uppercase text-sm">m</span></span>
            { requiredHours && hours < requiredHours && (
              <WarningIcon />
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default function WorklogTotals() {
  const {
    currentDayTotal, previousDayTotal, currentMonthTotal, previousMonthTotal,
  } = useTodayWorklogTotals();

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center mb-4 gap-4 bg-base-300 rounded-lg">
        <WorklogStats label="Last Month" timeSpent={previousMonthTotal} requiredHours={100} />
        <WorklogStats label="This Month" timeSpent={currentMonthTotal} requiredHours={100} />
      </div>
      <div className="flex flex-row flex-wrap justify-center mb-4 gap-4 bg-base-300 rounded-lg">
        <WorklogStats label="Yesterday" timeSpent={previousDayTotal} requiredHours={5} />
        <WorklogStats label="Today" timeSpent={currentDayTotal} requiredHours={5} />
      </div>
    </>
  )
}