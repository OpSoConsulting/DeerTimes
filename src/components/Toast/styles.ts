import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface AutoCompleteLineStyle {
  container: ViewStyle;
  text: TextStyle;
}

export default StyleSheet.create<AutoCompleteLineStyle>({
  container: {
    backgroundColor: 'black',
    alignItems: 'stretch',
    padding: 8,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 3,
  },
  text: {
    color: 'white',
  },

});
