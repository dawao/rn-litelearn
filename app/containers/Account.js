import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, View, ImageBackground } from 'react-native'
import { Avatar, Button, Card, ListItem, Icon } from "react-native-elements";
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import { NavigationActions } from '../utils'
import colors from '../config/colors';

@connect()
class Account extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({ focused, tintColor, horizontal }) => (
      <Icon
        name="user"
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

  gotoMyProfile = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'MyProfile' }))
  }
  gotoUnderstand = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Understand' }))
  }
  gotoMyClass = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'MyClass' }))
  }
  gotoMyResult = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'MyResult' }))
  }
  gotoSetup = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Setup' }))
  }
  gotoGrammarTest = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'GrammarTest' }))
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }
  gotoProduct = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Product' }))
  }

  render() {
    return (


      <View style={styles.container}>
        <ImageBackground style={{ flex: 1, width: global.SCREEN_WIDTH,  height: 450, }}
              source={require('../images/gb.jpg')}>
          <View style={[styles.container,{marginTop:60 ,backgroundColor:'transparent'}]}>
            <Avatar
                    size="xlarge"
                    onPress={this.gotoDetail}
                    overlayContainerStyle={{backgroundColor: colors.grey1}}
                    rounded
                    icon={{name: 'rocket', color: 'orange', type: 'font-awesome'}}
                  />

            <Text
                style={{
                  fontSize: 46,
                  color: '#fff',
                  fontFamily: 'bold',
                  textAlign: 'center',
                  marginTop: 20,
                  marginBottom: 10,
                }}
              >
                王琳琳
            </Text>
            <TouchableOpacity onPress={this.gotoMyProfile}>
            <Text
                style={{
                  fontSize: 32,
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                完善个人资料&nbsp;&nbsp;>
              </Text></TouchableOpacity>
          </View>
          <View style={{flex:2}}>
            <Card containerStyle={{borderWidth:0,borderRadius: 10, marginBottom: 20, marginLeft: 40, padding: 15, width: SCREEN_WIDTH - 80}} >
            <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 0,paddingTop:20,
  height:170
                  }}
                >
                  <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    
                  }}
                >
                <Icon
                  size={80}
                  name='map-o'
                  type='font-awesome'
                  color='orange'
                  onPress={this.gotoGrammarTest} />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 36,
                    color: 'gray',
                    textAlign: 'center',
                    marginVertical: 10
                  }}
                >
                  语法测试
                </Text>
              </View>

              <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    
                  }}
                >
                <Icon
  size={80}
  name='file-text'
  type='font-awesome'
  color='#17CA4F'
  onPress={this.gotoUnderstand} />
              <Text
                style={{
                  flex: 1,
                  fontSize: 36,
                  color: 'gray',
                  textAlign: 'center',
                  marginVertical: 10
                }}
              >
                阅读理解
              </Text>
              </View>
             {/*  <View style={{ width:1, height:100, marginTop: 30, backgroundColor: 'gray' }} /> */}
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',

                }}
              >
              <Icon
                size={80}
                name='calendar-check-o'
                type='font-awesome'
                color='#43ADFF'
                onPress={() => console.log('hello')} />
              <Text
                style={{
                  flex: 1,
                  fontSize: 36,
                  color: 'gray',
                  textAlign: 'center',
                  marginVertical: 10
                }}
              >
                结业测试
              </Text>
              </View>
              </View>
            
          </Card>
          <View style={{  marginVertical: 10 }} >
            <ListItem containerStyle={{borderWidth:0,borderRadius: 10, marginLeft: 40, padding: 20, width: SCREEN_WIDTH - 80}}
              title={'课程信息'}
              titleStyle={{  fontSize: 32 }}
              leftIcon={{ name: 'book',size: 38,color:'#17CA4F',type:'font-awesome' }}
              chevron={{ size: 36  }}
              onPress={this.gotoMyClass}
            />
            </View>
            <View style={{  marginVertical: 10 }} >
            <ListItem containerStyle={{borderWidth:0,borderRadius: 10, marginLeft: 40, padding: 20, width: SCREEN_WIDTH - 80}}
              title={'测试报告'}
              titleStyle={{ fontSize: 32 }}
              leftIcon={{ name: 'file-text-o',size: 38,color:'#17CA4F',type:'font-awesome' }}
              chevron={{ size: 36  }}
              onPress={this.gotoMyResult}
            />
            </View>
            <View style={{  marginVertical: 10 }} >
              <ListItem containerStyle={{borderWidth:0, borderRadius: 10, marginLeft: 40, padding: 20, width: SCREEN_WIDTH - 80}} 
                title={'设置'}
                titleStyle={{  fontSize: 32 }}
                leftIcon={{ name: 'cog',size: 38, color:'#17CA4F',type:'font-awesome' }}
                chevron={{ size: 36  }}
                onPress={this.gotoSetup}
              />
            </View>
          </View>
        </ImageBackground>
        {/* 
            <Image style={{ flex: 1 }}
              source={require('../images/account.png')}></Image>
        </TouchableOpacity> */}
      </View>
   
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: global.SCREEN_WIDTH,
    height: global.SCREEN_HEIGHT,
    backgroundColor: colors.grey1,
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Account
