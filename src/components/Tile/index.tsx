import * as React from 'react';
import { View } from 'react-native';
import styles from './styles';

export default function (props: any): any {
  return (
    <View style={styles.tile}>
      {props.children}
    </View>
  );
}
