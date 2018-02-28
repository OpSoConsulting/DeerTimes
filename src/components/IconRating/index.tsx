import React from 'React';
import { View, Image } from 'react-native';
import deerImgSrc from '../../assets/icons/deer/deer.png';
import halfDeerImgSrc from '../../assets/icons/deer/half-deer.png';
import { iconRatingWidths } from './utils';

export default function (props: { score: number, windows: number, min: number, max: number }) {

  return (
    <View style={{ flexDirection: 'row' }}>
    {
      iconRatingWidths(props.windows, props.min, props.max, props.score)
        .map((e) => {
          if (e === 1) {
            return (
              <Image
                style={{ marginRight: 2, width: 20, height: 20 }}
                source={deerImgSrc}
                resizeMode="center"
              />
            );
          }

          if (e > 0) {
            return (
              <Image
                style={{ marginRight: 2, width: 20, height: 20 }}
                source={halfDeerImgSrc}
                resizeMode="center"
              />
            );
          }

          return false;
        })
    }
    </View>
  );
}
