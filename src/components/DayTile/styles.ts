import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../theme/colors';
import constants from '../../theme/constants';

interface DayTileStyles {
  tile: ViewStyle;
  dayTitle: TextStyle;
  daytimeWindowsLabel: TextStyle;
  value: TextStyle;
  subtext: TextStyle;
}

export default StyleSheet.create<DayTileStyles>({
  tile: {
    backgroundColor: 'white',
    paddingLeft: constants.textInputPaddingLeft,
    padding: 8,
    paddingTop: 10,
    paddingBottom: 15,
    ...constants.borderStyle,
  },
  dayTitle: {
    color: 'white',
    fontFamily: 'Merriweather',
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 20,
    flex: 1,
  },
  daytimeWindowsLabel: {
    fontSize: 18,
    marginTop: 2,
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    marginTop: 1,
    marginBottom: 3,
  },
  subtext: {
    fontSize: 16,
    marginBottom: 3,
    fontStyle: 'italic',
    color: colors.secondaryText,
  },

});
