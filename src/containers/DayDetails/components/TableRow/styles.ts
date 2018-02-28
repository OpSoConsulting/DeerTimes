import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface TableRowStyles {
  row: ViewStyle;
  moonLabel: TextStyle;
  moonData: TextStyle;
}

export default StyleSheet.create<TableRowStyles>({
  row: {
    margin: 3,
    flexDirection: 'row',
    padding: 3,
  },
  moonLabel: {
    color: 'orange',
    flex: 1,
  },
  moonData: {
    color: 'white',
    flex: 1,
    textAlign: 'right',
  },
});
