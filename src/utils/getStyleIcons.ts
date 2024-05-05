export function getIconStyle(iconName: string, dateTime: string): string {
  const hours = new Date(dateTime).getHours();
  const dayTime = hours >= 6 && hours <= 18;

  return dayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
