import React, { Component } from 'react'
import { NativeModules, StyleSheet, StatusBar, Image } from 'react-native'
import {
  Header, Left, Container,  Button, Body, Title, Right, Icon, Text, Content } from "native-base";
import { connect } from 'react-redux'

// import { Button } from '../components'

import { NavigationActions } from '../utils'

@connect()
class Home extends Component {
  static navigationOptions = {
    tabBarLabel: '速记',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }
  gotoProduct = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Product' }))
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false}/>
        <Header
          noShadow
          iosBarStyle={"dark-content"}
          androidStatusBarColor={"#fff"}
          style={{ borderBottomWidth: 1 }}>
          <Left style={styles.headerLeft}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" style={{ color: "#000" }}/>
            </Button>
          </Left>
          <Body style={styles.headerBody}>
          <Title style={styles.textBody}>当前在背</Title>
          </Body>
          <Right style={styles.headerRight}/>
        </Header>
        
        <Content>
          {/* <Button text="Goto Detail" onPress={this.gotoDetail} /> */}
          <Button transparent onPress={this.gotoDetail}>
            <Text>Goto 单词</Text>
          </Button>
          <Button transparent onPress={this.gotoProduct}>
            <Text>Goto Product</Text>
          </Button>
          <Text style={{ alignSelf: "center", marginTop: 10}}>背单词主页</Text>
          <Button
            onPress={() => NativeModules.ActivityStarter.navigateToExample()}
          >
           <Text>Start example activity</Text>
          </Button>
          <Button
            onPress={() => NativeModules.ActivityStarter.dialNumber('+1 (234) 567-8910')}
            >
            <Text>Dial +1 (234) 567-8910</Text>
           </Button>

          <Button
            onPress={() => NativeModules.Clipboard.setString("Hello from JavaScript!")}
            >
            <Text>Copy to clipboard</Text>
           </Button>
        </Content>
      </Container>
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
