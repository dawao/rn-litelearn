import React, { Component } from 'react'
import { NativeModules, StyleSheet, Text, Image, View } from 'react-native'
import { Button, Rating, Icon } from "react-native-elements";
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from '../utils'

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
      <View style={styles.container}>
      
        <Button
              title="Goto 单词"
              onPress={this.gotoDetail}
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: { x:1, y: 0 },
                end: { x: 0.2, y: 0 },
              }}
              buttonStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
              }}
              containerStyle={{ marginVertical: 10, height: 40, width: 200 }}
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
            />
        
        <Button
            title="Goto Product"
            onPress={this.gotoProduct}
            icon={{
              name: 'home',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: 'rgba(90, 154, 230, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{ width: 130 }}
          />
          <Button
            title="打开原生界面"
            onPress={() => NativeModules.ActivityStarter.navigateToExample()}
            icon={{
              name: 'user',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconRight
            iconContainerStyle={{ marginLeft: 10 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: 'rgba(199, 43, 98, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{ marginVertical: 10, height: 40, width: 200 }}
          />
          <Button
            title="打开原生播放器"
            onPress={() => NativeModules.ActivityStarter.navigateToPlayer()}
            buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
            containerStyle={{ height: 40 }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
          />
          <Button
            title="打开嵌入视频的原生页面"
            onPress={() => NativeModules.ActivityStarter.navigateToVideo()}
            containerStyle={{ marginVertical: 10, height: 40 }}
            buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
          />

          <Button
            title="开始复习"
            onPress={this.gotoReview}
            buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
            containerStyle={{ height: 40 }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
          />
          <Button
            title="提示升级"
            onPress={() => NativeModules.ActivityStarter.navigateToUpdate()}
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            containerStyle={{ marginVertical: 10, height: 40 }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
          />
          {/* <Button text="Goto Detail" onPress={this.gotoDetail} /> */}


          <Text style={{ alignSelf: "center", marginTop: 10}}>背单词主页</Text>
          <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={3.6}
              readonly
              imageSize={40}
              style={{ paddingVertical: 10 }}
            />
          <Button title="Copy to clipboard"
            onPress={() => NativeModules.Clipboard.setString("Hello from JavaScript!")}
            >
           </Button>

      </View>
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
