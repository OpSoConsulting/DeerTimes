import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { DayRecord } from '../../types';
import Tile from '../Tile';
import MoonPhaseIcon from '../MoonPhaseIcon';
import mapNumToMonth from '../../utils/numToMonth';
import isDaytimeHours from '../../utils/inDaytimeHours';
import IconRating from '../IconRating';
import moment from 'moment';

export default function (props: DayRecord): any {

  const { windows } = props;

  let daytimeWindows = windows.filter((e) => {
    return (
      isDaytimeHours(e.peak, props.sundata.rise, props.sundata.set)
    );
  });

  if (daytimeWindows.length === 0) {
    daytimeWindows = windows.filter((e) => {
      return (
        (moment(e.peak).hour() >= 6) && (moment(e.peak).hour() < 18)
      );
    });
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', backgroundColor: '#191970', padding: 8, paddingLeft: 20 }}>
        <Text style={styles.dayTitle}>
          {`${props.dayofweek.slice(0, 3)} ${mapNumToMonth(props.month).slice(0, 3)} ${props.day}`}
        </Text>
        <MoonPhaseIcon curphase={props.curphase} />
      </View>
      <Tile>
        <View style={{ marginBottom: 2 }}>
          <Text style={styles.daytimeWindowsLabel}>
            {`Daytime Windows: `}
          </Text>
          {
            daytimeWindows.map(e => (
              <View style={{ marginBottom: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.value}>
                    {`${moment(e.start).format('HH:mm')} - ${moment(e.end).format('HH:mm')}: `}
                  </Text>
                  <IconRating
                    score={e.index}
                    windows={5}
                    min={.23}
                    max={.63}
                  />
                </View>
                <Text style={styles.subtext}>
                  {`${Math.round(e.index * 100)}% Deer Active`}
                </Text>
              </View>
            ))
          }
        </View>
      </Tile>
    </View>
  );
}
