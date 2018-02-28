import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../theme/colors';
import constants from '../../theme/constants';

interface AutoCompleteLineStyle {
  line: ViewStyle;
  resultName: TextStyle;
  resultAdditional: TextStyle;
}

export default StyleSheet.create<AutoCompleteLineStyle>({
  line: {
    backgroundColor: 'white',
    paddingLeft: constants.textInputPaddingLeft,
    padding: 8,
    borderBottomWidth: constants.borderWidth,
    borderBottomColor: '#d6d7da',
  },
  resultName: {

  },
  resultAdditional: {
    fontSize: 8,
    color: colors.secondaryText,
  },
});
