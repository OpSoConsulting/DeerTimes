import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import colors from '../../../../theme/colors';

interface MoonImageStyles {
  container: ViewStyle;
  activityContainer: ViewStyle;
  activity: ViewStyle;
  image: ImageStyle;
}

export default StyleSheet.create<MoonImageStyles>({
  container: { 
    height: 200, 
    flex: 1, 
    flexDirection: 'column',
  },
  activityContainer: {
    left: 0, 
    right: 0,
    bottom: 0, 
    top: 0, 
    position: 'absolute',
  },
  activity: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  image: {
    width: '100%', 
    height: '100%',
  },
});
