import React, { Component } from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Button, Body, Container, Header, Content, Form, Footer, Label, Left, Icon, Item, Input, Right, Spinner,Text } from 'native-base'

import { Touchable } from '../components'

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
          <Container>
          <Header noShadow style={{ backgroundColor: "white" }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1 }}>
              <Icon
                name="logo-twitter"
                style={{ alignSelf: "center", color: "#4286f4" }}
              />
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent onPress={this.gotoRegister}>
                <Text style={{ color: "#4286f4" }}>注册</Text>
              </Button>
              <Button transparent>
                <Icon name="more" style={{ color: "#4286f4" }} />
              </Button>
            </Right>
          </Header>
          <Content style={styles.content}>
            <Text style={styles.heading}></Text>
            <Form>
              <Item stackedLabel last>
                <Label>请输入手机号或学号</Label>
                <Input placeholder="Username" onChangeText={(username) => this.setState({ username })}/>
              </Item>
              <Item stackedLabel last>
                <Label>请输入密码</Label>
                <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>
              </Item>
            </Form>
            <Container style={styles.topMargin}>
            {this.props.loginStatus === "ongoing" ? <Spinner /> : null}
            {this.props.loginStatus === "failed" ? (
              <Text style={{ color: "#f92a3f" }}>登录失败</Text>
            ) : null}
            <Button
              full
              style={{ backgroundColor: "#4286f4" }}
              onPress={this.onLogin}
            >
              <Text>登录</Text>
            </Button>
            </Container>
            <Button
              transparent
              style={{
                margin: 15,
                marginTop: 25,
                width: "50%",
                alignSelf: "center"
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}
              >
                忘记密码?
              </Text>
            </Button>
          </Content>
          <Footer >

          </Footer>
          </Container>
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
