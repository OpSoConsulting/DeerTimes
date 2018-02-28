import { StyleSheet, TextStyle } from 'react-native';
import colors from '../../theme/colors';

interface InfoTileStyle {
  label: TextStyle;
  title: TextStyle;
  body: TextStyle;
}

export default StyleSheet.create<InfoTileStyle>({
  label: {
    fontSize: 10,
    color: colors.secondaryText,
    marginBottom: 15,
    marginTop: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    color: colors.primaryText,
    fontFamily: 'Merriweather',
  },
  body: {
    fontSize: 13,
    color: colors.secondaryText,
  },
});
