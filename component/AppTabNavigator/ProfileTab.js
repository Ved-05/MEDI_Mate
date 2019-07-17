import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';

import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'native-base';

class ProfileTab extends Component {

  static navigationOptions = {
    title: "PROFILE",
    headerStyle: {
        backgroundColor: '#5856d6',
        elevation: 0,
    },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24
    },
  }

  render() {
    return(
      <View style={styles.container}>
      <ScrollView>
          <View style={styles.header}>
            <Image style={styles.userIcon} source={require('../icons/user.png')} />
            <Text style={styles.userName}>
              U&nbsp;S&nbsp;E&nbsp;R&nbsp; N&nbsp;A&nbsp;M&nbsp;E
            </Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.savedButton}>
              <Icon
                style={{
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  fontSize: 22,
                  color: '#ffffff'
                }}
                name='ios-medkit' />
              &nbsp;&nbsp;Saved Medicines
            </Text>
          </View>

          <View style={styles.medicineList}>
            <View style={styles.detailsBlock}>
              <Text style={styles.details}>Medicine Name</Text>
              <Text style={styles.manufacturer}>Distributer Name</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.details}>&#8377; 00.00</Text>
            </View>
          </View>

          <View style={styles.medicineList}>
            <View style={styles.detailsBlock}>
              <Text style={styles.details}>Medicine Name</Text>
              <Text style={styles.manufacturer}>Distributer Name</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.details}>&#8377; 00.00</Text>
            </View>
          </View>

          <View style={styles.medicineList}>
            <View style={styles.detailsBlock}>
              <Text style={styles.details}>Medicine Name</Text>
              <Text style={styles.manufacturer}>Distributer Name</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.details}>&#8377; 00.00</Text>
            </View>
          </View>

          <View style={styles.medicineList}>
            <View style={styles.detailsBlock}>
              <Text style={styles.details}>Medicine Name</Text>
              <Text style={styles.manufacturer}>Distributer Name</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.details}>&#8377; 00.00</Text>
            </View>
          </View>

          <View style={styles.medicineList}>
            <View style={styles.detailsBlock}>
              <Text style={styles.details}>Medicine Name</Text>
              <Text style={styles.manufacturer}>Distributer Name</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.details}>&#8377; 00.00</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}
export default ProfileTab ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  header:{
    paddingVertical: 15,
    backgroundColor: '#5856d6',
    alignItems: 'center',
  },
  userIcon:{
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName:{
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '400',
  },
  textContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#5856d6',
  },
  savedButton:{
    fontSize: 20,
    color: '#ffffff',
    padding: 15
  },
  medicineList:{
    flex:1,
    backgroundColor: '#fff',
    marginVertical: 5,
    flexDirection:'row',
    padding: 20,
    justifyContent:'space-between',
  },
  details:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  manufacturer:{
    fontSize: 16,
  },
  price:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
});
