import React, { Component } from 'react'
import { NativeModules, StyleSheet, Text, Image, View, ImageBackground } from 'react-native'
import { Avatar, Button, Card, Divider, Icon } from "react-native-elements";
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationActions } from '../utils'
import colors from '../config/colors';

@connect()
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '速记',
    tabBarIcon: ({ focused, tintColor, horizontal }) => (
      <Icon
        name="home"
        type="font-awesome"
        color={ focused ? tintColor : 'gray' }
        size={horizontal ? 50 : 56}
        style={[styles.icon, ]}
      />
    ),
    tabBarOptions:{
      labelStyle: {
        fontSize: 22,
      },
      style : {
        height: 80,
      },
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      fill:45,
      indeterminate: true,
    };
  }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
      
  }

  gotoReview = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Review' }))
  }
  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }
  gotoProduct = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Product' }))
  }

  render() {
    return (
      <ImageBackground style={{ flex: 1 }}
        source={require('../images/timg.jpg')}>

      <View style={styles.container}>
      <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 40,
                  color: '#4f4f4f',
                  fontFamily: 'bold',
                  textAlign: 'center',
                }}
              >
                人教版（三-七年级上册）
              </Text>
        </View>
        <View  style={{ flex:2,}}>

        <AnimatedCircularProgress
          size={360}
          width={20}
          duration={0}
          backgroundWidth={30}
          tintColor="#fff"
          fill={100}
          rotation={0}
          backgroundColor="#CAF4D2"
          style={{ position:'absolute' }}
        />
        <AnimatedCircularProgress
            size={360}
            width={25}
            backgroundWidth={0}
            fill={this.state.fill}
            duration={0}
            tintColor="#16CA4E"
            backgroundColor="transparent"
            rotation={0}
            lineCap="round"
            >
              {
                (fill) => (
                
                      <Text  style={{
                        fontSize: 50,
                        color: '#16CA4E',
                        fontFamily: 'regular',
                        lineHeight:50,
                      }}>{ this.state.fill } %</Text>

                )
              }
          </AnimatedCircularProgress>
        </View>
        <View style={{ flex:3,paddingTop: 30,}}>

         <Card containerStyle={{borderRadius: 20, padding: 20, width: SCREEN_WIDTH - 120}} >
          <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 10,
                  height:180,
                }}
              >
                <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  
                }}
              >
              <Text
                style={{
                  flex: 1,
                  fontSize: 50,
                  color: '#4f4f4f',
                  fontFamily: 'bold',
                  textAlign: 'center',
                  lineHeight:100,
                }}
              >
                190
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 36,
                  color: 'gray',
                  textAlign: 'center',
                  marginVertical: 20
                }}
              >
                需学总量
              </Text>
              </View>
              <View style={{ width:1, height:100, marginTop: 30, backgroundColor: 'gray' }} />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  
                }}
              >
              <Text
                style={{
                  flex: 1,
                  fontSize: 50,
                  color: '#4f4f4f',
                  fontFamily: 'bold',
                  textAlign: 'center',
                  lineHeight:100,
                }}
              >
                300
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 36,
                  color: 'gray',
                  textAlign: 'center',
                  marginVertical: 20
                }}
              >
                词汇总量
              </Text>
              </View>
              </View>
            <Divider style={{ backgroundColor: 'gray' }} />
            <View style={{ paddingTop: 30,}}>
              
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 10,
                }}
              >
                  <Avatar
                    size="xlarge"
                    onPress={this.gotoDetail}
                    overlayContainerStyle={{backgroundColor: colors.grey1}}
                    rounded
                    icon={{name: 'book', color: 'rgba(127, 220, 103, 1)', type: 'font-awesome'}}
                  />
                  <Avatar
                    size="xlarge"
                    onPress={this.gotoReview}
                    overlayContainerStyle={{backgroundColor: colors.grey1}}
                    rounded
                    icon={{name: 'rocket', color: 'orange', type: 'font-awesome'}}
                  />

              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 10,
                }}
              >
              <Text
                style={{
                  flex: 1,
                  fontSize: 32,
                  color: 'gray',
                  textAlign: 'center',
                }}
              >
                开始识记
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 32,
                  color: 'gray',
                  textAlign: 'center',
                }}
              >
                开始学习
              </Text>
              </View>
            </View>
          </Card>


           </View>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Home
