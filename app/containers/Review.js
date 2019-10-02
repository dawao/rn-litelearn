import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, Image, View, ImageBackground } from 'react-native'
import { Avatar, Button, Card, Divider, Icon } from "react-native-elements";
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationActions } from '../utils'
import colors from '../config/colors';

@connect()
class Review extends Component {
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

  gotoReviewWord = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'ReviewWord' }))
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

      <TouchableOpacity onPress={this.gotoReviewWord}>
      <Image style={{ flex: 1 }}
        source={require('../images/review.png')}></Image>
      </TouchableOpacity>

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

export default Review
