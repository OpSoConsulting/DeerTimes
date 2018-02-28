import { StyleSheet, TextStyle, ViewStyle, Platform } from 'react-native';

interface TableRowStyles {
  container: ViewStyle;
  contents: ViewStyle;
  divider: ViewStyle;
  autocompleteContainer: ViewStyle;
  rangeContainer: ViewStyle;
  leftDatePicker: ViewStyle;
  rightDatePicker: ViewStyle;
}

export default StyleSheet.create<TableRowStyles>({
  container: {
    flex: 1,
  },
  contents: {
    paddingTop: 150, 
    paddingBottom: 20,
  },
  divider: {
    height: 10,
  },
  autocompleteContainer: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0,
    padding: 10,
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 20,
      },
    }),
  },
  rangeContainer: {
    flexDirection: 'row', 
    marginTop: 55, 
    marginBottom: 10, 
    zIndex: 1,
  },
  leftDatePicker: {
    flex: 1,
    marginRight: 2, 
    shadowColor: 'black', 
    shadowOffset: { 
      width: 2, 
      height: 2,
    }, 
  },
  rightDatePicker: {
    flex: 1, 
    marginLeft: 2,
  },
});
