import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../theme/colors';

interface MethodologyStyles {
  title: TextStyle;
  textMargins: ViewStyle;
}

export default StyleSheet.create<MethodologyStyles>({
  title: {
    fontSize: 32,
    fontFamily: 'Merriweather',
    marginTop: 40,
  },
  textMargins: {
    marginLeft: 20,
    marginRight: 20,
  }
});
