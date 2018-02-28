import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from '../containers/Home';
import DayDetails from '../containers/DayDetails';
import Methodology from '../containers/Methodology';


import React from 'react';
import { Text } from 'react-native';
class PlaceholderScreen extends React.Component {
  render() {
    return <Text style={{ margin: 60 }}>Placeholder Screen</Text>;
  }
}

const homeNavigator = StackNavigator({
  Home: {
    screen: Home,
  },
  Details: {
    screen: DayDetails,
  },
  Methodology: {
    screen: Methodology,
  },
// tslint:disable-next-line:align
}, {
  containerOptions: {
    tabBarPosition: 'bottom',
  },
});

const rootNavigator = TabNavigator({
  Home: {
    screen: homeNavigator,
  },
  Research: {
    screen: PlaceholderScreen,
  },
  Account: {
    screen: PlaceholderScreen,
  },
});

export default rootNavigator;
