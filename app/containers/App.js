import React, { Component } from 'react';
import { View } from 'react-native';

import MainTabNavigation from 'app/navigations/MainTabNavigation';
import { Alert } from 'app/containers';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f0'}}>
        <Alert />
        <MainTabNavigation />
      </View>
    );
  }
}
