export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return \\s ago\;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return \\m ago\;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return \\h ago\;
  const days = Math.floor(hours / 24);
  if (days < 30) return \\d ago\;
  const months = Math.floor(days / 30);
  if (months < 12) return \\mo ago\;
  return \\y ago\;
}
