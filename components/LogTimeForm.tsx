import { FormEvent, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { formatTime } from "@utils/format";

const jiraIssueAtom = atomWithStorage<string>("jiraIssue", "");
const timeSpentAtom = atomWithStorage<{ hours: number, minutes: number }>("timeSpent", { hours: 0, minutes: 0 });

export default function LogTimeForm() {
  const now = new Date();

  const [saving, setSaving] = useState(false);
  const [jiraIssue, setJiraIssue] = useAtom(jiraIssueAtom);
  const [timeSpent, setTimeSpent] = useAtom(timeSpentAtom);
  const [date, setDate] = useState({ year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      timeSpentSeconds: timeSpent.hours * 3600 + timeSpent.minutes * 60,
      started: formatTime(date),
    }
    await fetch(`/api/worklog/${jiraIssue}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setSaving(false);
  }

  return (
    <form className="mb-8" onSubmit={submit}>
      <div className="form-control mb-2">
        <label className="label">
          <span className="label-text">Jira Issue</span>
        </label>
        <input
          type="text"
          name="issue"
          className="input input-bordered"
          defaultValue={jiraIssue}
          onChange={(e) => setJiraIssue(e.target.value)}
        />
      </div>
      <div className="flex flex-row mb-2 gap-2 justify-center">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Day</span>
          </label>
          <input
            type="number"
            name="day"
            className="input input-bordered w-20"
            defaultValue={date.day}
            onChange={(e) => setDate({ ...date, day: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Month</span>
          </label>
          <input
            type="number"
            name="month"
            className="input input-bordered w-20"
            defaultValue={date.month}
            onChange={(e) => setDate({ ...date, month: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Year</span>
          </label>
          <input
            type="number"
            name="year"
            className="input input-bordered w-40"
            defaultValue={date.year}
            onChange={(e) => setDate({ ...date, year: parseInt(e.target.value) })}
          />
        </div>
      </div>
      <div className="flex flex-row mb-8 gap-2 justify-center">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Hours</span>
          </label>
          <input
            type="number"
            name="hours"
            className="input input-bordered w-20"
            min={0}
            defaultValue={timeSpent.hours}
            onChange={(e) => setTimeSpent({ ...timeSpent, hours: parseInt(e.target.value) })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Minutes</span>
          </label>
          <input
            type="number"
            name="minutes"
            className="input input-bordered w-20"
            min={0}
            max={59}
            defaultValue={timeSpent.minutes}
            onChange={(e) => setTimeSpent({ ...timeSpent, minutes: parseInt(e.target.value) })}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <button
          type="submit"
          className={`btn btn-primary ${saving ? "btn-disabled loading" : ""}`}
          disabled={saving}
        >
          { saving ? "Saving" : "Log Time" }
        </button>
      </div>
    </form>
  );
}