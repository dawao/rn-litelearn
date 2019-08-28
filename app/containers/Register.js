import React, { Component } from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { Button, Touchable } from '../components'

import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/register ')())
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Main' }))
  }

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <Button text="gotoLogin" onPress={this.gotoLogin} />
        )}
        {!fetching && (
          <Touchable style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.icon}
              source={require('../images/close.png')}
            />
          </Touchable>
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
})

export default Register
