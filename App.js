//AIzaSyAY6q1WmKBYHX3dP9txZ-QDZpRv3a-igYI
//maps - AIzaSyDFNmxzrNuIav3yoIzyWqCzgivhPZ-aCOU
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import HomeScreen from './component/home/HomeScreen';

import {
  StackNavigator,
} from 'react-navigation';

const Navigation = StackNavigator({
  Home: { screen: HomeScreen },
});

export default class App extends React.Component {
  render() {
    return(
        <Navigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
