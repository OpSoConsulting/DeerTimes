import { Moment } from 'moment';

export interface Location {
  description: string;
  id: string;
  place_id: string;
  lat: number;
  lng: number;
  utc_offset: number;
}

export interface GoogleLocation {
  description: string;
  id: string;
  place_id: string;
}

export enum PrimaryMoonPhases {
  NewMoon = 'New Moon',
  FullMoon = 'Full Moon',
  FirstQuarter = 'First Quarter',
  LastQuarter = 'Last Quarter',
}

export enum MoonPhases {
  NewMoon = 'New Moon',
  FullMoon = 'Full Moon',
  FirstQuarter = 'First Quarter',
  LastQuarter = 'Last Quarter',
  WaxingCrescent = 'Waxing Crescent',
  WaningCrescent = 'Waning Crescent',
  WaxingGibbous = 'Waxing Gibbous',
  WaningGibbous = 'Waning Gibbous',
}

export enum Events {
  SunRise = 'Sun Rise',
  SunTransit = 'Sun Transit',
  SunSet = 'Sun Set',
  MoonRise = 'Moon Rise',
  MoonTransit = 'Moon Transit',
  MoonSet = 'Moon Set',
  MoonUnderfoot = 'Moon Underfoot',
}

export interface DayRecord {
  year: number;
  month: number;
  day: number;
  dayofweek: string;
  tz: number;
  sundata: {
    rise: string,
    transit: string,
    set: string,
  };
  moondata: {
    rise: string,
    transit: string,
    set: string,
    underfoot: string,
  };
  closestphase: {
    phase: string;
    date: string;
    time: string;
    moment: string;
  };
  fracillum: number;
  curphase: string;
  windows: WindowPeriod[];
}

export interface WindowPeriod {
  start: string;
  end: string;
  peak: string;
  event: Events;
  primary: boolean;
  index: number;
}
