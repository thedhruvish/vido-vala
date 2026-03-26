import { formatDistanceToNow, format } from "date-fns";

export function formatPostedAt(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 3) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return format(date, "MMM dd, yyyy");
}
