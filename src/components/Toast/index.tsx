import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function (props: { text: string, opacity: number }): any {
  return (
    <View style={[styles.container, { opacity: props.opacity }]}>
      <Text style={styles.text}>
        { props.text }
      </Text>
    </View>
  );
}
