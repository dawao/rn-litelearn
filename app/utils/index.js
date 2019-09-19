import { GraphQLClient } from 'graphql-request'
import { Dimensions, PixelRatio, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export { NavigationActions, StackActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

const { height, width } = Dimensions.get('window');
// 系统是iOS
global.iOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS === 'android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;
const TextSize = (size) => {
  if (global.PixelRatio === 2) {
    // iphone 5s and older Androids
    if (global.SCREEN_WIDTH < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (global.SCREEN_HEIGHT < 667) {
      return size;
      // iphone 6-6s
    } else if (global.SCREEN_HEIGHT >= 667 && global.SCREEN_HEIGHT <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (global.PixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (global.SCREEN_WIDTH <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (global.SCREEN_HEIGHT < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (global.SCREEN_HEIGHT >= 667 && global.SCREEN_HEIGHT <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (global.PixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (global.SCREEN_WIDTH <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (global.SCREEN_HEIGHT < 667) {
      return size * 1.20;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (global.SCREEN_HEIGHT >= 667 && global.SCREEN_HEIGHT <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.40;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  return size;
};

global.FONT_SIZE = TextSize;
const px2dp = function px2dp(px) {
  return px / 800 * (global.SCREEN_WIDTH);
};
global.px2dp = px2dp;


export const host = 'http://192.168.0.51:1337'

export const post = async (uri , opt) => {
  
    const Frisbee = require('frisbee');
  
    // create a new instance of Frisbee
    const api = new Frisbee({
      // baseURI: '', // optional
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // this is a simple example using `.then` and `.catch`
    // api.post('/auth/local').then(console.log).catch(console.error);
    try {
      // make the request
      let response = await api.post(uri.startsWith('http')?uri:(host + uri),opt)/* .then(response => {
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.body.user);
      console.log('User token', response.body.jwt);
    }).catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
    }) */;
      if(response && response.body){
        const token = response.body.jwt || response.body.id_token
        if(token)
          api.jwt(token)
      }
      return response
    } catch (err) {
      console.error(err);
      return null
    }
  }

  export const graph = async (query) => {
    const token = await AsyncStorage.getItem("token");
    const graphQLClient = new GraphQLClient( host + '/graphql', {
      headers: {
        Authorization: 'Bearer '+ (token ? token : '')
      },
    })
  
    const data = await graphQLClient.request(query)
    return data
  }