import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Icon } from 'native-base';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import AboutTab from '../AppTabNavigator/AboutTab';
import ProfileTab from '../AppTabNavigator/ProfileTab';
import HomeTab from '../AppTabNavigator/HomeTab';

class HomeScreen extends Component {
    static navigationOptions = {
      title: "MEDI_MATE",
      headerStyle: {
          backgroundColor: '#5856d6',
          elevation: 0,
      },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    }

  render() {
    return(
      <AppTabNavigator />
    );
  }
}
export default HomeScreen;

const AppTabNavigator = TabNavigator(
  {
    HOME: { screen: HomeTab },
    PROFILE: { screen: ProfileTab },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HOME') {
          iconName = iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'ABOUT') {
          iconName = iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'PROFILE') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} style={{color:'#5856d6', fontSize: 30}} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style:{
        backgroundColor: '#ffffff'
      }
    },
    animationEnabled: false,
    swipeEnabled: true,
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
