import moment from 'moment';
import { DayRecord } from '../../../types';
import getWindows from '../../../utils/getWindows';
import activityProbability from '../../../utils/activityProbability';
import { MappedSunMoonResponse } from './mapSunMoonResponse';

export default function (dayRecords: MappedSunMoonResponse[]): DayRecord[] {
  return dayRecords.map(dayRecord => ({
    ...dayRecord,
    windows: getWindows({
      phase: dayRecord.closestphase.phase,
      moondata: dayRecord.moondata,
      sundata: dayRecord.sundata,
    }).map(e => ({
      ...e,
      index: activityProbability({
        fracillum: dayRecord.fracillum,
        type: e.event,
      }),
    }))
    .sort((a, b) => moment(a.peak).valueOf() - moment(b.peak).valueOf()),
  }));
}
