import React from 'react';
import { View, Text } from 'react-native';
import { WindowPeriod } from '../../../../types/index';
import moment from 'moment';
import styles from './styles';
import Table from '../Table';

interface Props {
  periods: WindowPeriod[];
}

class SolunarWindow extends React.Component<Props> {
  render() {
    const { periods } = this.props;

    return (
      <Table
        title="2) Solunar Windows"
      >
        <View style={styles.tableHeader}>
          <Text style={styles.firstSectionHeaderText}>
            Window Type
          </Text>
          <Text style={styles.columnHeader}>
            Start{'\n'}Time
          </Text>
          <Text style={styles.columnHeader}>
            End{'\n'}Time
          </Text>
          <Text style={styles.columnHeader}>
            Pct. Active
          </Text>
        </View>
        {
          periods.map((e: WindowPeriod) => (
            <View key={e.event} style={styles.row}>
              <Text style={styles.rowLabel}>{e.event}</Text>
              <Text style={styles.timeColumn}>{moment(e.start).format('HH:mm')}</Text>
              <Text style={styles.timeColumn}>{moment(e.end).format('HH:mm')}</Text>
              <Text style={[styles.timeColumn, (e.index > 0.5) ? { color: 'lightgreen' } : (e.index < 0.4) ? { color: 'red' } : {}]}>
                {Math.round(e.index * 100)}%
              </Text>
            </View>
          ))
        }
      </Table>
    );
  }
}

export default SolunarWindow;
