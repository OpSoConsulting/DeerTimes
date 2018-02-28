import { Events } from '../types';

export interface ActivityProbabilityProps {
  type: Events;
  fracillum: number;
}

export enum FracillumCeilings {
  NewMoon = 12.5,
  EarlyCrescent = 25,
  LateCrescent = 37.5,
  EarlyFirstQuarter = 50,
  LateFirstQuarter = 62.5,
  EarlyGibbous = 75,
  LateGibbous = 87.5,
  FullMoon = 100,
}

export default function activityProbability({ fracillum, type }: ActivityProbabilityProps): number {
  let rank = 0;
  let additional: number = 0;
  if (fracillum < FracillumCeilings.NewMoon || fracillum > FracillumCeilings.LateGibbous) {
    rank = 4;
    if (fracillum < FracillumCeilings.NewMoon) {
      additional = FracillumCeilings.NewMoon / 2 - fracillum;
    } else {
      additional = fracillum - (FracillumCeilings.FullMoon + FracillumCeilings.LateGibbous) / 2;
    }
  } else if (fracillum < FracillumCeilings.EarlyCrescent || fracillum > FracillumCeilings.EarlyGibbous) {
    rank = 3;
    if (fracillum < FracillumCeilings.EarlyCrescent) {
      additional = (FracillumCeilings.EarlyCrescent + FracillumCeilings.NewMoon) / 2 - fracillum;
    } else {
      additional = fracillum - (FracillumCeilings.LateGibbous + FracillumCeilings.EarlyGibbous) / 2;
    }
  } else if (fracillum < FracillumCeilings.LateCrescent || fracillum > FracillumCeilings.LateFirstQuarter) {
    rank = 2;
    if (fracillum < FracillumCeilings.LateCrescent) {
      additional = (FracillumCeilings.LateCrescent + FracillumCeilings.EarlyFirstQuarter) / 2 - fracillum;
    } else {
      additional = fracillum - (FracillumCeilings.LateFirstQuarter + FracillumCeilings.EarlyGibbous) / 2;
    }
  } else {
    rank = 1;
    if (fracillum < FracillumCeilings.EarlyFirstQuarter) {
      additional = (FracillumCeilings.EarlyFirstQuarter + FracillumCeilings.LateCrescent) / 2 - fracillum;
    } else {
      additional = fracillum - (FracillumCeilings.LateFirstQuarter + FracillumCeilings.EarlyFirstQuarter) / 2;
    }
  }

  return activityProbabilities[type][rank - 1] + additional / 100;

}

export interface ActivityProbabilitiesType {
  [key:string]: number[];
}

export const activityProbabilities: ActivityProbabilitiesType = {
  [Events.MoonRise]: [0.38, 0.50, 0.53, 0.56],
  [Events.MoonSet]: [0.40, 0.43, 0.55, 0.59],
  [Events.MoonTransit]: [0.54, 0.37, 0.38, 0.40],
  [Events.MoonUnderfoot]: [0.54, 0.39, 0.31, 0.30],
};
