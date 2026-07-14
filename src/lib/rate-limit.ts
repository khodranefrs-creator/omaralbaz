const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = submissions.get(ip) || [];
  const recent = times.filter((t) => now - t < RATE_WINDOW);
  submissions.set(ip, recent);
  return recent.length >= RATE_LIMIT;
}

export function recordSubmission(ip: string): void {
  const times = submissions.get(ip) || [];
  times.push(Date.now());
  submissions.set(ip, times);
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
