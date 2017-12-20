import React, {Component} from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Orders from '../screens/Orders';
import Settings from '../screens/Settings';

const routeConfig = {
  OrderList: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Orders',
		})
  },
  UserSettingsScreen: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
			tabBarLabel: 'Settings',
		})
  },
};

const navigatorConfig = {
  animationEnabled: true,
  lazy: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: '#333333',
    activeBackgroundColor: '#fff',
    inactiveTintColor: '#333333',
    inactiveBackgroundColor: '#fff',
    indicatorStyle: {
      backgroundColor: '#1194f6',
    },
    style: {
      backgroundColor: '#fff',
      elevation: 0,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    }
  },
  tabBarPosition: 'top',
};

export default TabNavigator(routeConfig, navigatorConfig);
