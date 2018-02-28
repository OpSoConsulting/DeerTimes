import React from 'react';
import { View, ScrollView, TouchableOpacity, Button, Text } from 'react-native';
import styles from './styles';

class Home extends React.Component<any, any> {

  static navigationOptions = {
    title: 'Methodology',
  };

  public render() {
    return (
      <ScrollView>
        <View style={styles.textMargins}>
          <Text style={styles.title}>
            Our Methodology
          </Text>
        </View>
      </ScrollView>
    );
  }

}

export default Home;
