import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../theme/colors';
import constants from '../../theme/constants';

interface AutoCompleteInputStyle {
  container: TextStyle;
  inputContainer: TextStyle;
  textInput: TextStyle;
  results: ViewStyle;
}

export default StyleSheet.create<AutoCompleteInputStyle>({
  container: {
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: constants.inputHeight,
    paddingLeft: constants.textInputPaddingLeft,
    paddingRight: 10,
    ...constants.borderStyle,
  },
  textInput: {
    flex: 1,
    fontSize: constants.inputFontSize,
  },
  results: {
    borderWidth: constants.borderWidth,
    borderColor: colors.border,
    alignSelf: 'stretch',
    // elevation: 1,
  },
});
