import React, { Component } from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Button, ListItem, Icon } from "react-native-elements";

import { createAction, NavigationActions } from '../utils'

const list1 = [
  {
    title: '个人信息',
    icon: 'av-timer',
  },
  {
    title: '课程信息',
    icon: 'flight-takeoff',
  },
  {
    title: '测验信息',
    icon: 'lightbulb-outline',
  },
  {
    title: '统计信息',
    icon: 'track-changes',
  },
];
const log = () => console.log('this is an example method');
const renderRow = ({ item }) => {
  return (
    <ListItem
      onPress={log}
      title={item.title}
      leftIcon={{ name: item.icon }}
      chevron
      bottomDivider
    />
  );
};

@connect(({ app }) => ({ ...app }))
class Account extends Component {
  static navigationOptions = {
    title: '测试',
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

  /* <Image
      style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
      source={require('../images/person.png')}
    /> */
  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }))
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }

  render() {
    const { login } = this.props
    return (
      <View style={styles.container}>
    
      <View style={styles.list}>
        <FlatList
          data={list1}
          keyExtractor={a => a.title}
          renderItem={renderRow}
        />
      </View>
        {login ? (
          <Button title="退出系统" onPress={this.logout} />
        ) : (
          <Button title="Goto Login" onPress={this.gotoLogin} />
        )}
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
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
})

export default Account
