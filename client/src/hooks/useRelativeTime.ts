import { useState, useEffect } from "react";

function getRelativeTimeString(unixTimestampInSeconds: number): string {
  // Current UNIX timestamp in seconds
  const now = Math.floor(Date.now() / 1000);
  let diffInSeconds = now - unixTimestampInSeconds;

  // Handle future timestamps or exact current time
  if (diffInSeconds <= 0) {
    return "0s ago";
  }

  const days = Math.floor(diffInSeconds / 86400);
  diffInSeconds %= 86400;

  const hours = Math.floor(diffInSeconds / 3600);
  diffInSeconds %= 3600;

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return `${parts.join(", ")} ago`;
}

export function useRelativeTime(
  unixTimestampInSeconds: number,
  intervalMs = 1000,
): string {
  const [relativeTime, setRelativeTime] = useState<string>(() =>
    getRelativeTimeString(unixTimestampInSeconds),
  );

  useEffect(() => {
    // Update immediately when timestamp prop changes
    setRelativeTime(getRelativeTimeString(unixTimestampInSeconds));

    const timer = setInterval(() => {
      setRelativeTime(getRelativeTimeString(unixTimestampInSeconds));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [unixTimestampInSeconds, intervalMs]);

  return relativeTime;
}
