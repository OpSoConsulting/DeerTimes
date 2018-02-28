import * as React from 'react';
import { Text } from 'react-native';
import { MoonPhases } from '../../types';

export default function (props: { curphase: string }): any {

  interface MoonSrcMap {
    [key: string]: string;
  }

  const imgSrcMap: MoonSrcMap = {
    [MoonPhases.WaxingGibbous]: '🌔',
    [MoonPhases.WaningGibbous]: '🌖',
    [MoonPhases.WaxingCrescent]: '🌒',
    [MoonPhases.WaningCrescent]: '🌘',
    [MoonPhases.NewMoon]: '🌑',
    [MoonPhases.FullMoon]: '🌕',
    [MoonPhases.FirstQuarter]: '🌓',
    [MoonPhases.LastQuarter]: '🌗',
  };
  return <Text style={{ fontSize: 20 }}>{imgSrcMap[props.curphase]}</Text>;
}
