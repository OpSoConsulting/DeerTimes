import React from 'react';
import { View, Text, Linking } from 'react-native';
import styles from './styles';

interface Props {
  title: string;
  url: string;
}

class ExternalLink extends React.Component<Props> {
  render() {
    const { title, url } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title} </Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(url)}
        >
         (View)
        </Text>
      </View>
    );
  }
}

export default ExternalLink;
