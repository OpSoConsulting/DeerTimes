import React from 'react';
import { View, ViewStyle, Text, StyleSheet } from 'react-native';
import { WindowPeriod } from '../../../../types/index';
import styles from './styles';

interface Props {
  title: string;
  style?: ViewStyle;
}

class Table extends React.Component<Props> {
  render() {
    const { title, children, style } = this.props;
    const tableStyle = StyleSheet.flatten([styles.section, style]);

    return (
      <View style={tableStyle}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>
            { title }
          </Text>
        </View>
        { children }
      </View>
    );
  }
}

export default Table;
