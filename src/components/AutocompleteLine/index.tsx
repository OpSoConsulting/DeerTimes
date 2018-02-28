import * as React from 'react';
import { View, Text, TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';
import styles from './styles';

interface AutoCompleteLineProps {
  text: string;
  id: string;
  onResultPress: (id: string) => void;
}

export default function ({ text, id, onResultPress }: AutoCompleteLineProps): any {
  const components = text.split(',');
  const Touchable = (Platform.OS === 'ios') ? TouchableHighlight : TouchableNativeFeedback;
  return (
    <Touchable
      onPress={() => onResultPress(id)}
    >
      <View style={styles.line}>
        <Text style={styles.resultName}>{components[0]}</Text>
        {
          (components.length > 1) &&
          (
            <Text style={styles.resultAdditional}>
              {components.slice(1).join(',').slice(1)}
            </Text>
          )
        }
      </View>
    </Touchable>
  );
}
