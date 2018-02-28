import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../../../theme/colors';

interface ExternalLinkStyles {
  container: ViewStyle;
  text: TextStyle;
  link: TextStyle;
}

export default StyleSheet.create<ExternalLinkStyles>({
  container: { flexDirection: 'row', marginTop: 20 },
  text: { color: 'orange' },
  link: { textDecorationLine: 'underline', color: 'white' }
});
