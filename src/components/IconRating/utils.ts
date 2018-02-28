export function iconRatingWidths(windowCount: number, min: number, max: number, score: number): number[] {
  // tslint:disable-next-line
  const windows = Array.from(new Array(windowCount));
  const interval = (max - min) / windowCount;

  return windows.map((e, i) => {
    if (score >= (min + interval * (i + 1))) {
      return 1;
    }
    return Math.max((score - (min + interval * i)) / interval, 0);
  });

}
