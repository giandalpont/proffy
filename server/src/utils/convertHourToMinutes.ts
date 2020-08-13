export default function convertHourToMinuts(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeiInMinutes = (hour * 60) + minutes;

  return timeiInMinutes;
}
