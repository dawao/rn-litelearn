import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class LoadingScreen extends React.Component {
  componentDidMount() {
    const { login } = this.props


    // if (login)
    //   this.props.navigation.dispatch(SwitchActions.jumpTo({ "routeName":"Main" })); 
    // else
    //   this.props.navigation.dispatch(SwitchActions.jumpTo({ "routeName":"UnApp" }));
    const initialRouteName = login ? 'Main' : 'UnApp';
    this.props.navigation.navigate(initialRouteName);
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LoadingScreen
