import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../../../theme/colors';

interface TableStyles {
  section: ViewStyle;
  sectionHeader: ViewStyle;
  sectionHeaderText: TextStyle;
}

export default StyleSheet.create<TableStyles>({
  section: {
    alignSelf: 'stretch',
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 15,
  },
  sectionHeader: {
    alignSelf: 'stretch',
    backgroundColor: 'darkgray',
    paddingLeft: 4,
  },
  sectionHeaderText: {
    color: 'white',
  },
});
