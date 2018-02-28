import moment, { Moment } from 'moment';
import { Events } from '../types';


export interface GetWindowsProps {
  phase: string;
  moondata: {
    rise: string,
    transit: string,
    set: string,
    underfoot: string,
  };
  sundata: {
    rise: string,
    transit: string,
    set: string,
  };
}

export interface WindowPeriod {
  start: string;
  end: string;
  peak: string;
  event: Events;
  primary: boolean;
}

export default function getWindows({ phase, moondata, sundata }: GetWindowsProps): WindowPeriod[] {

  // 2 hours before until 1.5 hours after moonrise (228)
  const moonRisePeriodStart = moment(moondata.rise).subtract(2, 'hours');
  const moonRisePeriodEnd = moment(moondata.rise).add(90, 'minutes');
  // 2 hours before until 1 hour after (228)
  const moonSetPeriodStart = moment(moondata.set).subtract(2, 'hours');
  const moonSetPeriodEnd = moment(moondata.set).add(1, 'hours');

  const moonOverHeadPeriodStart = moment(moondata.transit).subtract(2, 'hours');
  const moonOverHeadPeriodEnd = moment(moondata.transit).add(1, 'hours');

  const moonUnderFootPeriodStart = moment(moondata.underfoot).subtract(2, 'hours');
  const moonUnderFootPeriodEnd = moment(moondata.underfoot).add(1, 'hours');

  const windows = [
    {
      start: moonRisePeriodStart.toISOString(),
      end: moonRisePeriodEnd.toISOString(),
      peak: moondata.rise,
      event: Events.MoonRise,
      primary: false,
    },
    {
      start: moonSetPeriodStart.toISOString(),
      end: moonSetPeriodEnd.toISOString(),
      peak: moondata.set,
      event: Events.MoonSet,
      primary: false,
    },
    {
      start: moonOverHeadPeriodStart.toISOString(),
      end: moonOverHeadPeriodEnd.toISOString(),
      peak: moondata.transit,
      event: Events.MoonTransit,
      primary: false,
    },
    {
      start: moonUnderFootPeriodStart.toISOString(),
      end: moonUnderFootPeriodEnd.toISOString(),
      peak: moondata.underfoot,
      event: Events.MoonUnderfoot,
      primary: false,
    },
  ];

  if (phase === 'Full Moon' || phase === 'New Moon') {
    // near full moon, set rise and set to primary
    windows[0].primary = true;
    windows[1].primary = true;
  } else {
    // we are far from new or full moon
    windows[2].primary = true;
    windows[3].primary = true;
  }

  return windows;
}
