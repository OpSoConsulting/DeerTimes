import moment from 'moment';
import { DayRecord } from '../../../types';

// tslint:disable-next-line
export type MappedSunMoonResponse = Pick<DayRecord, 'year' | 'month' | 'day' | 'dayofweek' | 'tz' | 'sundata' | 'moondata' | 'closestphase' | 'fracillum' | 'curphase'>;

export default function mapSunMoonResponse(results: any[]): MappedSunMoonResponse[] {
  return results.map((e: any) => {
    const sunRiseEv = e.sundata.filter((event: { phen: string, time: string }) => event.phen === 'R')[0];
    const sunTransitEv = e.sundata.filter((event: { phen: string, time: string }) => event.phen === 'U')[0];
    const sunSetEv = e.sundata.filter((event: { phen: string, time: string }) => event.phen === 'S')[0];
    let moonRiseEv = e.moondata.filter((event: { phen: string, time: string }) => event.phen === 'R')[0];
    let moonTransitEv = e.moondata.filter((event: { phen: string, time: string }) => event.phen === 'U')[0];
    let moonLowerTransitEv = e.moondata.filter((event: { phen: string, time: string }) => event.phen === 'L')[0];
    let moonSetEv = e.moondata.filter((event: { phen: string, time: string }) => event.phen === 'S')[0];

    if (!moonRiseEv) {
      const moonSetHour = parseInt(moonSetEv.time.slice(0,2), 10);
      moonRiseEv = { phen: 'R', time: ''.concat(
        padStartPoly(`${(moonSetHour >= 12) ? (moonSetHour - 12) : (moonSetHour + 12)}`, 2, '0'),
        `:${moonSetEv.time.slice(3)}`,
      )};
    }
    if (!moonSetEv) {
      const moonRiseHour = parseInt(moonRiseEv.time.slice(0,2), 10);
      moonSetEv = { phen: 'S', time: ''.concat(
        padStartPoly(`${(moonRiseHour >= 12) ? (moonRiseHour - 12) : (moonRiseHour + 12)}`, 2, '0'),
        `:${moonRiseEv.time.slice(3)}`,
      )};
    }
    if (!moonTransitEv) {
      if (!moonLowerTransitEv) {
        const moonRiseHour = parseInt(moonRiseEv.time.slice(0,2), 10);
        const moonSetHour = parseInt(moonSetEv.time.slice(0,2), 10);
        if (moonRiseHour < 18) {
          moonTransitEv = { phen: 'U', time: ''.concat(
            padStartPoly(`${(moonRiseHour + 6)}`, 2, '0'),
            `:${moonRiseEv.time.slice(3)}`,
          )};
        } else {
          moonTransitEv = { phen: 'U', time: ''.concat(
            padStartPoly(`${(moonSetHour - 6)}`, 2, '0'),
            `:${moonSetEv.time.slice(3)}`,
          )};
        }
      } else {
        const moonLowerHour = parseInt(moonLowerTransitEv.time.slice(0,2), 10);
        moonTransitEv = { phen: 'U', time: ''.concat(
          padStartPoly(`${(moonLowerHour >= 12) ?  (moonLowerHour - 12) :  (moonLowerHour + 12)}`, 2, '0'),
          `:${moonLowerTransitEv.time.slice(3)}`,
        )};
      }
    }
    if (!moonLowerTransitEv) {
      const moonUpperHour = parseInt(moonTransitEv.time.slice(0,2), 10);
      moonLowerTransitEv = { phen: 'L', time: ''.concat(
        padStartPoly(`${(moonUpperHour >= 12) ?  (moonUpperHour - 12) :  (moonUpperHour + 12)}`, 2, '0'),
        `:${moonTransitEv.time.slice(3)}`,
      )};
    }

    const twoDigitMonth = padStartPoly(String(e.month), 2, '0');
    const twoDigitDay = padStartPoly(String(e.day), 2, '0');
    return {
      year: e.year,
      month: e.month,
      day: e.day,
      dayofweek: e.dayofweek,
      tz: e.tz,
      sundata: {
        rise: moment(`${e.year}-${twoDigitMonth}-${twoDigitDay} ${sunRiseEv.time}`).toISOString(),
        transit: moment(`${e.year}-${twoDigitMonth}-${twoDigitDay} ${sunTransitEv.time}`).toISOString(),
        set: moment(`${e.year}-${twoDigitMonth}-${twoDigitDay} ${sunSetEv.time}`).toISOString(),
      },
      moondata: {
        rise: moment(`${e.year}-${twoDigitMonth}-${twoDigitDay} ${moonRiseEv.time}`).toISOString(),
        transit: moment(`${e.year}-${twoDigitMonth}-${twoDigitDay} ${moonTransitEv.time}`).toISOString(),
        set: moment(`${e.year}-${twoDigitMonth}-${twoDigitDay} ${moonSetEv.time}`).toISOString(),
        underfoot: moment(`${e.year}-${twoDigitMonth}-${twoDigitDay} ${moonLowerTransitEv.time}`).toISOString(),
      },
      closestphase: {
        ...e.closestphase,
        moment: moment(`${e.closestphase.date} ${e.closestphase.time}`, 'MMMM D, YYYY HH:mm').toISOString(),
      },
      fracillum: parseFloat(e.fracillum || phases[e.closestphase.phase]),
      // When day IS a phase, it leaves this prop out
      curphase: e.curphase || e.closestphase.phase,
    };
  });
}

function padStartPoly(str: string, len: number, char: string): string {
  let paddedStr = str;
  while (paddedStr.length < len) {
    paddedStr = char + paddedStr;
  }
  return paddedStr;
}

const phases : {
  'New Moon': string;
  'First Quarter': string;
  'Full Moon': string;
  'Last Quarter': string;
  [key: string]: string;
} = {
  'New Moon': '0%',
  'First Quarter': '50%',
  'Full Moon': '100%',
  'Last Quarter': '50%',
};
