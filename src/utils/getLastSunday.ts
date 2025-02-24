export function getLastSunday(day?: Date): Date {
  const today = day ? new Date(day) : new Date();
  const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)
  const lastSunday = new Date(today);

  lastSunday.setDate(today.getDate() - dayOfWeek);
  lastSunday.setHours(0, 0, 0, 0); // Resetando para meia-noite

  return lastSunday;
}