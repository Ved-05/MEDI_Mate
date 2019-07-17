import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  Keyboard,
  ActivityIndicator
} from 'react-native';
const SCREEEN_HEIGHT = Dimensions.get('window').height;
const SCREEEN_WIDTH = Dimensions.get('window').width;

import { Button, Icon} from 'native-base';
import * as firebase from 'firebase';

class HomeTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowingState: false,
      isLoading: true,
      dataSource: '',
      text: '',
      //Searched Medicine Details
      searchedMedicineName: '',
      searchedMedicineMfg: '',
      searchMedicinePrice: '',
      searchMedicineSize: '',
      searchMedicineContent: '',
      //Alternative Medicine Details
      alternativeMedicines: '',
      alternativeMedicineName: '',
      alternativeMedicineMfg: '',
      alternativeMedicinePrice: '',
      alternativeMedicineSize: '',
      alternativeMedicineContent: '',
    };
  }
  componentWillMount() {
    this.greetingHeight = new Animated.Value(170);
    this.regionComponentHeight = new Animated.Value(125);
    this.medicineViewHeight = new Animated.Value(SCREEEN_HEIGHT / 1.9);

    //FirebaseDetails
    var config = {
      apiKey: "AIzaSyCAbkJtXUoIdgOBz9UcHyKv-sRn5ndBrpA",
      authDomain: "appl-a1775.firebaseapp.com",
      databaseURL: "https://appl-a1775.firebaseio.com",
      storageBucket: "appl-a1775.appspot.com"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }else{
      Alert.alert('Error Initializing Database Please Restart');
    }
  }

  //Dynamic Search Start : Call to Health OS API

  dyanamicSearch = (text) => {
    this.setState({ text });
    var url = 'http://www.healthos.co/api/v1/autocomplete/medicines/brands/'
    if (text == '') {
      url += 'A';
    } else {
      url += text;
    }
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 2e9cec26e583c81b76eb57a3531bd050731caf0b5bf37638d6c72c4411f8e4ea'
      }
    }

    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        }, function () {
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Dynamic Search End : Call to Health OS API
  //Code for Alterative medicine
  giveAlternative(takeItem) {
    Keyboard.dismiss();
    medicine_id = takeItem.medicine_id;
    regionToBeFetched = this.selectedRegion;
    //Variable Initialization
    let a = [];
    let b = [];
    let l = [];
    let medName = [];
    let medManufacture = [];
    let no = 0;
    this.setState({
      searchedMedicineName: takeItem.name,
      searchedMedicineMfg: takeItem.manufacturer,
      searchMedicinePrice: takeItem.price.toString(),
      searchMedicineSize: takeItem.size.toString(),
      searchMedicineContent: takeItem.constituents[0].name,
    });
    Animated.timing(this.medicineViewHeight, {
      toValue: SCREEEN_HEIGHT / 1.7,
      duration: 100,
    }).start()
    var a_url = 'http://www.healthos.co/api/v1/medicines/brands/'+medicine_id+'/alternatives?page=1&size=10';
    return fetch(a_url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 2e9cec26e583c81b76eb57a3531bd050731caf0b5bf37638d6c72c4411f8e4ea'
      }
    }

    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (var x in responseJson) {

          this.value = (responseJson[x].name);
          a.push(this.value);
          this.medName = a;

          this.id = (responseJson[x].manufacturer);
          b.push(this.id);
          this.medManufacture = b;
          var database = firebase.database();

         var leadsRef = database.ref(regionToBeFetched).child(this.medManufacture[x]);
         leadsRef.on('value', function(snapshot) {
             var childData = snapshot.val();

               if(childData != null){
                 l.push(responseJson[no]);
               }else{
                 no = no + 1;
               }
             });
         }
         
         if(l == null){
            l.push('No Alternative Available');
         }

        this.setState({
          isLoading: false,
          alternativeMedicines: responseJson,
        }, function () {
            
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //End Code

  //Animations between Screens
  giveFullScreenToSearchMedicine() {
    Animated.timing(this.greetingHeight, {
      toValue: SCREEEN_HEIGHT,
      duration: 100,
    }).start(() => { this.refs.textInputMobile.focus() })
  }
  giveFullScreenToRegion() {
    Animated.timing(this.regionComponentHeight, {
      toValue: SCREEEN_HEIGHT,
      duration: 100,
    }).start()
  }

  getBackToOriginalSearchState() {
    Keyboard.dismiss();
    this.setState({ text: '' });
    Animated.timing(this.greetingHeight, {
      toValue: 170,
      duration: 100,
    }).start()
    Animated.timing(this.medicineViewHeight, {
      toValue: SCREEEN_HEIGHT / 1.9,
      duration: 100,
    }).start()
  }

  location(stateSelected) {
    this.setState(previousState => {
      return { isShowingState: true };
    });
    this.selectedRegion = stateSelected;
    Animated.timing(this.regionComponentHeight, {
      toValue: 125,
      duration: 100,
    }).start()
  }

  render() {
    const greetingTextOpacity = this.greetingHeight.interpolate({
      inputRange: [170, SCREEEN_HEIGHT],
      outputRange: [1, 0]
    })
    const greetingTextMargin = this.greetingHeight.interpolate({
      inputRange: [170, SCREEEN_HEIGHT],
      outputRange: [0, -80]
    })

    const RegionComponentMargin = this.regionComponentHeight.interpolate({
      inputRange: [125, SCREEEN_HEIGHT],
      outputRange: [0, -170]
    })

    const greetingKiMargin = this.regionComponentHeight.interpolate({
      inputRange: [125, SCREEEN_HEIGHT],
      outputRange: [0, -170]
    })

    const imageDimensions = this.regionComponentHeight.interpolate({
      inputRange: [125, SCREEEN_HEIGHT],
      outputRange: [75, 50]
    })

    const topMarginOfSelections = this.regionComponentHeight.interpolate({
      inputRange: [125, SCREEEN_HEIGHT],
      outputRange: [15, 0]
    })

    const HideComponents = this.medicineViewHeight.interpolate({
      inputRange: [SCREEEN_HEIGHT / 1.9, SCREEEN_HEIGHT / 1.7],
      outputRange: [1, 0]
    })

    const marginTopHideComponents = this.medicineViewHeight.interpolate({
      inputRange: [SCREEEN_HEIGHT / 1.9, SCREEEN_HEIGHT / 1.7],
      outputRange: [0, -SCREEEN_HEIGHT / 1.7]
    })

    const ShowComponents = this.medicineViewHeight.interpolate({
      inputRange: [SCREEEN_HEIGHT / 1.9, SCREEEN_HEIGHT / 1.7],
      outputRange: [0, 1]
    })

    const marginTopShowComponents = this.medicineViewHeight.interpolate({
      inputRange: [SCREEEN_HEIGHT / 1.9, SCREEEN_HEIGHT / 1.7],
      outputRange: [0, -SCREEEN_HEIGHT / 11]
    })
    return (
      <View style={styles.container}>
        <Animated.View style={{
          padding: 15,
          paddingHorizontal: 30,
          backgroundColor: '#5856d6',
          height: this.greetingHeight,//animated,
          marginTop: greetingKiMargin,
        }}>
          <Animated.Text style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
            opacity: greetingTextOpacity,//Animated,
            marginTop: greetingTextMargin,//Animted
          }}>
            Good Evening !{"\n"}
            User Name.
            </Animated.Text>
          <TouchableOpacity
            onPress={
              () => this.giveFullScreenToSearchMedicine()
            }>
            <View
              pointerEvents="none"
              style={styles.textInputStyle}
            >
              <TextInput
                ref="textInputMobile"
                style={{ flex: 1, paddingLeft: 15 }}
                placeholder="Search the alternative medicine !"
                underlineColorAndroid="transparent"
                onChangeText={(text) => this.dyanamicSearch(text)}
                value={this.state.text}
              />
              <Icon
                style={{
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  fontSize: 24,
                  color: '#5856d6'
                }}
                name='ios-search' />
            </View>
          </TouchableOpacity>

          <Animated.View style={{
            height: this.medicineViewHeight, //Animated
            marginTop: 2,
          }}>
            <Animated.ScrollView styles={
              {
                opacity: HideComponents,//Animated
                marginTop: marginTopHideComponents,//Animated
              }
            }>
              <FlatList
                data={this.state.dataSource}
                renderItem={
                  ({ item }) =>
                    <TouchableOpacity onPress={() => this.giveAlternative(item)}>
                      <Animated.View style={{
                        opacity: HideComponents,//Animated,
                        marginTop: marginTopHideComponents,//Animated
                        flexDirection: 'row',
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        borderRadius: 5,
                        borderBottomWidth: 1,
                        borderColor: 'rgba(88,86,214,0.7)',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}><Text style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        color: '#5856d6',
                        fontSize: 14,
                        justifyContent: 'space-between',
                      }}>{item.name}</Text>
                        <Icon
                          style={{
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            fontSize: 22,
                            color: '#32ca55'
                          }}
                          name='ios-search' />
                      </Animated.View>
                    </TouchableOpacity>
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </Animated.ScrollView>
            <Animated.ScrollView style={{
              opacity: ShowComponents,//Animated
              marginTop: marginTopShowComponents,//Animated,
              backgroundColor: '#f2ffff',
              borderRadius: 5,
              elevation: 2,
            }}>
              <View style={styles.medicineBox}>
                <Text style={styles.medicineName}> {this.state.searchedMedicineName} </Text>
                <Text style={styles.manufacturerName}>{this.state.searchedMedicineMfg.toUpperCase()}</Text>
                <View style={styles.priceBox}>
                  <Text style={styles.price}>&#8377; {this.state.searchMedicinePrice}</Text>
                  <Text style={styles.size}>{this.state.searchMedicineSize}</Text>
                </View>
                <View>
                  <Text style={styles.contents}>Contents{"\n"}{this.state.searchMedicineContent.toUpperCase()}</Text>
                </View>
              </View>
              <View>
                <Text style={{
                  fontWeight: '400',
                  color: '#aaaaaa',
                  fontSize: 16,
                  padding: 10
                }} > ALTERNATIVES </Text>
              </View>
              <FlatList
                data={ this.state.alternativeMedicines }
                renderItem={
                  ({ item }) =>
                    <View style={styles.medicineBox}>
                      <Text style={styles.medicineName}>{item.name}</Text>
                      <Text style={styles.manufacturerName}>{item.manufacturer.toUpperCase()}</Text>
                      <View style={styles.priceBox}>
                        <Text style={styles.price}>&#8377; {item.price}</Text>
                        <Text style={styles.size}>{item.size}</Text>
                      </View>
                      <View>
                        <Text style={styles.contents}>Contents{"\n"}{item.constituents[0].name.toUpperCase()}</Text>
                      </View>
                    </View>
                }
                keyExtractor={(item, index) => index.toString()}
              />

            </Animated.ScrollView>
          </Animated.View>
          <TouchableOpacity
            onPress={
              () => this.getBackToOriginalSearchState()
            }
            style={{
              position: 'absolute',
              top: SCREEEN_HEIGHT - 200,
              left: 20,
              borderWidth: 2,
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 100,
              backgroundColor: '#F2FFF2',
              borderColor: '#5856d6',
              elevation: 3
            }}
          >
            <Animated.View>
              <Icon
                style={{
                  fontSize: 24,
                  color: '#5856d6',
                  fontWeight: 'bold'
                }} name="md-arrow-back" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{
          flex: 1,
          marginTop: topMarginOfSelections,
        }}>
          <Animated.View style={{
            marginVertical: 0,
            height: this.regionComponentHeight,
            paddingHorizontal: 20,
            backgroundColor: '#ffffff',
            elevation: 1,
            justifyContent: 'flex-start',
          }}>
            <TouchableOpacity
              onPress={
                () => this.giveFullScreenToRegion()
              }
            >
              <Animated.View style={{
                flexDirection: 'row',
                paddingVertical: 25,
                justifyContent: 'center',
              }}>
                <Animated.Image style={{
                  height: imageDimensions,
                  width: imageDimensions,
                  marginHorizontal: 10,
                }} source={this.state.isShowingState ? require('../icons/location.png') : require('../icons/location2.png')} />

                <View style={styles.textContainer}>
                  <Button
                    style={styles.iconButton}>
                    <Text style={styles.iconText}> {this.state.isShowingState ? this.selectedRegion : 'SELECT REGION'} </Text>
                  </Button>
                  <Text style={styles.iconDescription}>
                    {this.state.isShowingState ? 'Change previously selected region and find the required alternative !' : 'Choose a region where you want to find substitute.'}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
            <ScrollView style={{
              //ListView
              marginBottom: 170,
            }}>
              <FlatList
                data={[
                  { key: 'Andhra Pradesh' },
                  { key: 'Arunachal Pradesh' },
                  { key: 'Assam' },
                  { key: 'Bihar' },
                  { key: 'Chattisgarh' },
                  { key: 'Goa' },
                  { key: 'Gujrat' },
                  { key: 'Haryana' },
                  { key: 'Himachal Pradesh' },
                  { key: 'Jammu & Kashmir' },
                  { key: 'Jharkhand' },
                  { key: 'Karnataka' },
                  { key: 'Kerela' },
                  { key: 'Madhya Pradesh' },
                  { key: 'Maharashtra' },
                  { key: 'Manipur' },
                  { key: 'Meghalaya' },
                  { key: 'Mizoram' },
                  { key: 'Nagaland' },
                  { key: 'Odisha' },
                  { key: 'Punjab' },
                ]}
                renderItem={
                  ({ item }) => <TouchableOpacity onPress={() => this.location(item.key)}>
                    <View style={styles.item} ><Icon style={{
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      fontSize: 28,
                      color: '#5856d6'
                    }}
                      name='ios-pin' /><Text style={{
                        fontSize: 16,
                        color: '#5856d6', fontWeight: '400'
                      }} >{item.key}</Text></View></TouchableOpacity>

                }
              />
            </ScrollView>
          </Animated.View>

          <TouchableOpacity
            onPress={
              () => this.giveFullScreenToSearchMedicine()
            }
          >
            <View style={styles.imageContainer}>
              <Image style={styles.iconStyle} source={require('../icons/medicine2.png')} />

              <View style={styles.textContainer}>
                <Button
                  style={styles.iconButton}
                  onPress={
                    () => this.giveFullScreenToSearchMedicine()
                  }
                >
                  <Text style={styles.iconText}>SEARCH SUBSTITUTE</Text>
                </Button>
                <Text style={styles.iconDescription}>
                  Search for the alternative medicine in your region.
                </Text>
              </View>

            </View>
          </TouchableOpacity>
        </Animated.View>

      </View>
    );
  }
}
export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  greeting: {
    padding: 15,
    paddingHorizontal: 30,
    backgroundColor: '#5856d6',
    height: this.greetingHeight,
  },
  textInputStyle: {
    backgroundColor: '#ffffff',
    marginTop: 15,//animated
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    elevation: 3,
  },
  navigations: {
    flex: 1,
    marginTop: 15
  },
  imageContainer: {
    marginVertical: 15,
    height: 125,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    elevation: 1,
  },
  iconStyle: {
    height: 75,
    width: 75,
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    marginTop: -5
  },
  iconButton: {
    backgroundColor: '#fff',
    elevation: 0,
    height: 30,
    marginBottom: 5,
    borderBottomWidth: 1
  },
  iconText: {
    fontSize: 16,
    color: '#5856d6'
  },
  iconDescription: {
    fontSize: 13,
    color: '#5856d6'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  medicineBox: {
    padding: 10,
    marginVertical: 5,
  },
  medicineName: {
    fontSize: 16,
    color: '#5856d6',
    fontWeight: 'bold',
  },
  manufacturerName: {
    fontSize: 14,
    color: '#888',
  },
  priceBox: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    paddingTop: 5,
    borderColor: '#bbb',
    borderTopWidth: 1,
  },
  price: {
    fontSize: 16,
    color: '#5856d6',
  },
  size: {
    fontSize: 14,
    backgroundColor: '#5856d6',
    color: '#fff',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  contents: {
    fontSize: 14,
    color: '#999',
  }
});
