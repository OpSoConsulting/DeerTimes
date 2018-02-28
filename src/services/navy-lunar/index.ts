import moment, { Moment } from 'moment';
import mapSunMoonResponse from './mappers/mapSunMoonResponse';
import mapMoonWindows from './mappers/mapMoonWindows';
import { DayRecord } from '../../types';
import config from '../../config';
import { singleDayMock } from './mocks';

export interface GetSunMoonParams {
  start: Moment;
  end: Moment;
  lat: number;
  lng: number;
  utc_offset: number;
}

export function getSunMoon({ start, end, lat, lng, utc_offset }: GetSunMoonParams) {
  function genUrl(date: string, lat: number, lng: number, utcOffset: number) {
    // tslint:disable-next-line
    return `http://api.usno.navy.mil/rstt/oneday?date=${date}&coords=${lat},${lng}&tz=${Math.round(utcOffset / 60)}`;
  }

  function orderDays(a: DayRecord, b: DayRecord): number {
    return moment(a.sundata.rise).valueOf() - moment(b.sundata.rise).valueOf();
  }

  const dayFetches = [...Array(end.diff(start, 'days') + 1)]
    .map((e, i) => {
      const date = start.clone().add(i, 'days').format('MM/DD/YYYY');
      const url = genUrl(date, lat, lng, utc_offset);

      if (!config.USE_MOCK_SERVICES) {
        return fetch(url)
          .then(res => res.json());
      }
      return singleDayMock;
    });

  return Promise.all(dayFetches)
    .then(responses => mapSunMoonResponse(responses))
    .then(responses => mapMoonWindows(responses))
    .then(dayRecords => dayRecords.sort(orderDays));

}
