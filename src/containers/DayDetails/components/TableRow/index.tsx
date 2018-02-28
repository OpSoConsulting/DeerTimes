import React from 'react';
import { View, Text } from 'react-native';
import { WindowPeriod } from '../../../../types/index';
import styles from './styles';

interface Props {
  title: string;
  value: string;
}

class TableRow extends React.Component<Props> {
  render() {
    const { title, value } = this.props;

    return (
      <View style={styles.row} key="title">
        <Text style={styles.moonLabel}>
          {title}
        </Text>
        <Text style={styles.moonData}>
          {value}
        </Text>
      </View>
    );
  }
}

export default TableRow;
