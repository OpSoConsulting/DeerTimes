import React from 'react';
import { View, Text, Image, ImageURISource, ActivityIndicator } from 'react-native';
import styles from './styles';

interface Props {
  source: ImageURISource;
}

class MoonImage extends React.Component<Props> {
  render() {
    const { source } = this.props;

    return (
      <View
        style={styles.container}
      >
        <View style={styles.activityContainer}>
          <ActivityIndicator style={styles.activity} />
        </View>
        <Image
          source={source}
          style={styles.image}
        />
      </View>
    );
  }
}

export default MoonImage;
