import * as React from 'react';
import { View, Text, Image, ImageURISource, Linking, TouchableOpacity } from 'react-native';
import styles from './styles';
import Tile from '../Tile';

export interface InfoTileProps {
  label: string;
  title: string;
  body: string;
  imgSrc: ImageURISource;
  hyperlink: string;
  onPress?: Function;
}

export default function (props: InfoTileProps): any {

  function handlePress() {
    if (props.onPress) {
      props.onPress();
    } else {
      Linking.openURL(props.hyperlink);
    }
  }

  return (
    <Tile>
      <View>
        <Text style={styles.label}>{props.label}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.body}>{props.body}</Text>
        <View
          style={{ height: 100, marginTop: 25, marginBottom: 15, alignSelf: 'stretch', flexDirection: 'row' }}
        >
          <Image
            source={props.imgSrc}
            style={{ flex: 1, height: 100, marginLeft: -50, marginRight: -50 }}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity onPress={() => handlePress()}>
          <Text style={{ color: '#3366BB', marginBottom: 5 }}>
            Find out more &#x3e;
          </Text>
        </TouchableOpacity>
      </View>
    </Tile>
  );
}
