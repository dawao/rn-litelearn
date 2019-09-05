import React, { Component } from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import {
  Input,
  Icon,
  Button,
} from 'react-native-elements';

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
          <View>
          <View
          style={[
            styles.headerContainer,
            { backgroundColor: '#616389', marginTop: 20 },
          ]}
        >
          <Icon color="white" name="input" size={62} />
          <Text style={styles.heading}>Inputs</Text>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Input
            containerStyle={{ width: '90%' }}
            placeholder="Input with label"
            label="LABEL"
            labelStyle={{ marginTop: 16 }}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="Simple input"
          />
          <Input
            leftIcon={
              <Icon
                name="map-marker"
                type="font-awesome"
                color="#86939e"
                size={25}
              />
            }
            leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
            containerStyle={styles.inputContainerStyle}
            placeholder="Input with left icon"
          />
          <Input
            rightIcon={
              <Icon
                name="chevron-right"
                type="entypo"
                color="#86939e"
                size={25}
              />
            }
            containerStyle={styles.inputContainerStyle}
            placeholder="Input with right icon"
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder="Input with error message"
            errorMessage="Invalid input"
          />
          <Input
            containerStyle={[styles.inputContainerStyle]}
            placeholder="Shake input"
            ref={ref => (this.shakeInput = ref)}
            rightIcon={
              <Button
                title="Shake"
                onPress={() => this.shakeInput && this.shakeInput.shake()}
              />
            }
            errorMessage="Shake me on error !"
          />
          <Button title="gotoLogin" onPress={this.gotoLogin} />
        </View> </View>
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
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#B46486',
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
