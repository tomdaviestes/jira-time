export default function LoginForm() {
  return (
    <form
      action="/api/login" method="POST"
    >
      <div className="flex flex-row justify-center mb-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Jira Host</span>
          </label>
          <input
            type="text"
            name="jiraHost"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center mb-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Jira User</span>
          </label>
          <input
            type="text"
            name="accountId"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center mb-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Jira Access Token</span>
          </label>
          <input
            type="text"
            name="jiraApiKey"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center mb-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Clockwork Access Token</span>
          </label>
          <input
            type="text"
            name="clockworkApiKey"
            className="input input-bordered"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center mb-4">
        <button type="submit" className="btn btn-primary">Log In</button>
      </div>
    </form>
  );
}