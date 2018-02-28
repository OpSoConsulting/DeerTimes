import moment, { Moment } from 'moment';

export default function inDayTimeHours(event: string, sunrise: string, sunset: string): boolean {
  const ev = moment(event);

  return ev.valueOf() >= moment(sunrise).valueOf()
  && ev.valueOf() <= moment(sunset).valueOf();
}
