/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import Navigation from './navigation/index';

console.disableYellowBox = true;

export const store = configureStore();
export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
