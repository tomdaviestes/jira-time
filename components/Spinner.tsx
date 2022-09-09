export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="inline-block w-8 h-8 border-4 rounded-full border-primary spinner"
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
}