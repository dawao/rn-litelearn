import React, { Component } from 'react'
import { NativeModules, StyleSheet, Text, PixelRatio, Dimensions, View } from 'react-native'
import { Button, ListItem, Icon } from "react-native-elements";
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from '../utils'
import colors from '../config/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;


@connect()
class PreTest extends Component {
  static navigationOptions = {
    title: '水平测试主页',
  }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  gotoReview = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Review' }))
  }
  gotoHome = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
  }
  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }))
  }

  render() {

    return (
      <View style={styles.container}>
        <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
                marginHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 46,
                  color: '#4f4f4f',
                  fontFamily: 'bold',
                  textAlign: 'center',
                }}
              >
                欢迎使用单词学习软件
              </Text>
        </View>
        <View
              style={{
                flex: 2.5,
                marginTop: 20,
                width: SCREEN_WIDTH - 80,
                marginLeft: 40,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 36,
                  color: '#737373',
                  fontFamily: 'regular',
                  lineHeight:50,
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本软件使用了记忆曲线和五到法来帮助你高效的学习。 在开始学习之前，你需要选择合适的教材，水平测试可以帮助你确定学习当前教材是否合适。
                祝你好运！
              </Text>
        </View>
        <View style={styles.list}>
              <ListItem
                title="已选教材"
                titleStyle={{ fontWeight: 'bold', fontSize: 40 }}
                badge={{ value: '选择教材', textStyle:{fontSize: 32} ,badgeStyle:{ borderRadius: 50, marginVertical: 10, height: 50, width: 150 }}}
                bottomDivider
              />
              <ListItem title="未选" titleStyle={{ color: '#737373', fontSize: 36 }} checkmark  />
        </View>
       
        <View
            style={{
              flex: 1,
              marginTop: 30,
              width: SCREEN_WIDTH - 80,
              marginLeft: 40,
              justifyContent: 'flex-end',
            }}
          >
          <Button
            title="水平测试"
            onPress={this.gotoReview}
            titleStyle={{ fontWeight: 'bold', fontSize: 38 }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#FF9800', '#F44336'],
              start: { x:1, y: 0 },
              end: { x: 0.2, y: 0 },
            }}
            buttonStyle={{
              borderWidth: 0,
              borderColor: 'transparent',
              borderRadius: 50,
              width: SCREEN_WIDTH - 120,
              height: 80,
            }}
            containerStyle={{ marginVertical: 10, width: 200 }}

          /></View>
          <View
            style={{
              flex: 1,
              width: SCREEN_WIDTH - 80,
              marginLeft: 40,
              justifyContent:  'center',
            }}
          >
            <Button
              title="开始学习"
              onPress={this.gotoHome}
              titleStyle={{ fontWeight: '700', fontSize: 38  }}
              buttonStyle={{
                backgroundColor: 'rgba(127, 220, 103, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 50,
                width: SCREEN_WIDTH - 120,
                height: 80,
              }}
              containerStyle={{ marginVertical: 10,  width: 200 }}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: SCREEN_WIDTH - 80,
              marginLeft: 40,
              marginBottom: 80,
            }}
          >
          <Button
              title="退出"
              onPress={this.gotoLogin}
              titleStyle={{ fontWeight: '700', fontSize: 38  }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 50,
                width: SCREEN_WIDTH - 120,
                height: 80,
              }}
              containerStyle={{ width: 130 }}
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 35,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginVertical: 10, marginLeft: 10, marginRight: -10 }}
            /></View>

      </View>
    )
  }
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey1,

  },
  icon: {
    width: 32,
    height: 32,
  },
  list: {
    flex: 1.5,
    paddingTop: 10,
    marginBottom: 20,
    width: SCREEN_WIDTH - 80,
    height: 80,
    //borderTopWidth: 1,
    //borderColor: '#cbd2d9',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
})




export default PreTest
