import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import colors from '../../theme/colors';

interface DayDetailsStyles {
  container: ViewStyle;
  content: ViewStyle;
  moonInfoContainer: ViewStyle;
  sunInfoContainer: ViewStyle;
  header: ViewStyle;
  headerTable: ViewStyle;
}

export default StyleSheet.create<DayDetailsStyles>({
  container: { padding: 20, backgroundColor: 'black', flex: 1 },
  content: { paddingBottom: 80 },
  moonInfoContainer: { alignSelf: 'stretch', maxWidth: 250 },
  sunInfoContainer: { alignSelf: 'stretch', maxWidth: 200 },
  header: { flexDirection: 'row' },
  headerTable: { flex: 1 },
});
