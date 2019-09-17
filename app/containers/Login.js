import React, { Component } from 'react'
import { StyleSheet, View, Image,  Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Input, Button, Icon } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen'

// import { Touchable } from '../components'

import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: '系统登录',
  }

  constructor(props){
    super(props);

    this.state ={
        username: "jack",
        password: "123456",
        error: ""
    }
  }

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }

  onLogin = () => {
    const { username, password} = this.state
    this.props.dispatch(createAction('app/login')({username, password}))
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  gotoRegister = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Register' }))
  }

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (


          <View style={styles.content}>
            <Text style={styles.heading}></Text>

                <Text>请输入手机号或学号</Text>
                <Input placeholder="Username" onChangeText={(username) => this.setState({ username })}/>

                <Text>请输入密码</Text>
                <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>

            <View style={styles.topMargin}>
            {this.props.loginStatus === "ongoing" ? <ActivityIndicator /> : null}
            {this.props.loginStatus === "failed" ? (
              <Text style={{ color: "#f92a3f" }}>登录失败</Text>
            ) : null}
            <Button
              full
              style={{ backgroundColor: "#4286f4" }}
              onPress={this.onLogin}
              title={'登录'}
            >
            </Button>
            </View>
            <Button
              transparent
              style={{
                margin: 15,
                marginTop: 25,
                width: "50%",
                alignSelf: "center"
              }}
              title={'忘记密码'}
            >
            </Button>
          </View>


        )}
        {/* !fetching && (
          <Touchable style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.icon}
              source={require('../images/close.png')}
            />
          </Touchable>
        ) */}
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
  close: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
  topMargin: {
    marginTop: 125
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  footer: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 60,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
})

export default Login
