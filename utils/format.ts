export function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hours ${minutes} minutes`;
}

function pad(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatTime({ year, month, day }: { year: number; month: number; day: number }) {
  return `${year}-${pad(month)}-${pad(day)}T12:00:00.000+0000`;
}