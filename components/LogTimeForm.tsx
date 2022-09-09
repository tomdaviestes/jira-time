import { useState, useRef } from "react";
import Spinner from "./Spinner";

export default function LogTimeForm() {
  const now = new Date();

  const [saving, setSaving] = useState(false);

  const logTime = async () => {
    setSaving(true);
    // setSaving(false);
  }

  return (
    <form className="mb-8">
      <div className="form-control mb-2">
        <label className="label">
          <span className="label-text">Jira Issue</span>
        </label>
        <input
          type="text"
          name="issue"
          className="input input-bordered"
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
            defaultValue={now.getDate()}
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
            defaultValue={now.getMonth() + 1}
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
            defaultValue={now.getFullYear()}
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
            defaultValue={0}
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
            defaultValue={0}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <button
          type="button"
          className={`btn btn-primary ${saving ? "btn-disabled loading" : ""}`}
          onClick={logTime}
          disabled={saving}
        >
          { saving ? "Saving" : "Log Time" }
        </button>
      </div>
    </form>
  );
}