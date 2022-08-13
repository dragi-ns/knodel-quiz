const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;

function padDuration(duration) {
  return duration.toString().padStart(2, '0');
}

export function formatSeconds(totalSeconds) {
  let remainingSeconds = totalSeconds;
  const hours = Math.trunc(remainingSeconds / SECONDS_IN_HOUR);
  remainingSeconds %= SECONDS_IN_HOUR;
  const minutes = Math.trunc(remainingSeconds / SECONDS_IN_MINUTE);
  remainingSeconds %= SECONDS_IN_MINUTE;
  return `${hours ? padDuration(hours) + 'h' : ''} ${padDuration(
    minutes
  )}m ${padDuration(remainingSeconds)}s`;
}
