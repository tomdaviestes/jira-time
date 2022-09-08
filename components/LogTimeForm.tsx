export default function LogTimeForm() {
  return (
    <form>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Jira Issue</span>
        </label>
        <input
          type="text"
          name="issue"
          className="input input-bordered"
        />
      </div>
      <div className="flex flex-row mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Hours</span>
          </label>
          <input
            type="number"
            name="hours"
            className="input input-bordered"
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
            className="input input-bordered"
            min={0}
            max={59}
            defaultValue={0}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <button type="submit" className="btn btn-primary">Log Time</button>
      </div>
    </form>
  );
}