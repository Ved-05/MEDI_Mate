import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

import { Icon } from 'native-base';

class AboutTab extends Component {

  render() {
    return(
      <View style={styles.container}>
      </View>
    );
  }
}
export default AboutTab ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F2f2f2',
  },
});
