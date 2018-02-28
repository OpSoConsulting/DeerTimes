import { StyleSheet, ViewStyle } from 'react-native';
import constants from '../../theme/constants';

interface AutoCompleteLineStyle {
  tile: ViewStyle;
}

export default StyleSheet.create<AutoCompleteLineStyle>({
  tile: {
    backgroundColor: 'white',
    paddingLeft: constants.textInputPaddingLeft,
    paddingRight: constants.textInputPaddingLeft,
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 8,
    ...constants.borderStyle,
  },
});
