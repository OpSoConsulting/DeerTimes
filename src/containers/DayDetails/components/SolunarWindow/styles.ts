import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../../../theme/colors';

interface SolunarWindowStyles {
  tableHeader: ViewStyle;
  row: ViewStyle;
  rowLabel: TextStyle;
  section: ViewStyle;
  sectionHeader: ViewStyle;
  firstSectionHeaderText: TextStyle;
  sectionHeaderText: TextStyle;
  timeColumn: TextStyle;
  columnHeader: TextStyle;
}

export default StyleSheet.create<SolunarWindowStyles>({
  tableHeader: { 
    flexDirection: 'row' ,
  },
  firstSectionHeaderText: { 
    flex: 1, 
    color: 'white', 
    backgroundColor: 'gray', 
    margin: 0.5, 
    padding: 3,
  },
  row: {
    margin: 3,
    flexDirection: 'row',
    padding: 3,
  },
  rowLabel: {
    color: 'orange',
    flex: 1,
  },
  section: {
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
  columnHeader: {
    color: 'white',
    backgroundColor: 'gray',
    width: 70,
    margin: 0.5,
    textAlign: 'right',
    padding: 3,
  },
  timeColumn: {
    color: 'white',
    textAlign: 'right',
    width: 70,
  },
});
