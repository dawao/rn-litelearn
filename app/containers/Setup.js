import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet,Text, View, ActivityIndicator, Dimensions  } from 'react-native'
import { connect } from 'react-redux'

import SignatureCapture from 'react-native-signature-capture';
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Input, Button, Icon, Image } from 'react-native-elements';
import Swiper from 'react-native-swiper'
import { NavigationActions, createAction } from '../utils'
import { Pie } from '../components'


@connect(({ app }) => ({ ...app }))
class Setup extends Component {

  static navigationOptions = {
    title: '测试',
  }
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      fill:0,
      indeterminate: true,
    };
  }
  componentWillUnmount() {
    
  }
  componentDidMount() {

  }
  

  goAccount = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Account' }))
  }
  goql = () => {
    this.props.dispatch(createAction('app/queryGraph')({ql:GET_PRODUCTS}))
  }
  gotoLogin = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'LoginScreen' }))
  }

  render() {
    const { navigation } = this.props;
    return (
      <Swiper showsButtons={true} loop={false}>
      {/* <View style={styles.container}>
        
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}> */}
      


        <View style={styles.container}>
            <TouchableOpacity onPress={this.gotoLogin}>
            <Image style={{ marginTop: -10,}}
              source={require('../images/m7.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <TouchableOpacity onPress={this.goAccount}>
            <Image style={{ marginTop: -10,}}
              source={require('../images/m8.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            </TouchableOpacity>
        </View>
       {/* </ScrollView>
      </View> */}
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: '100%'
  },
  buttonStyle: {
      flex: 1, justifyContent: "center", alignItems: "center", height: 50,
      backgroundColor: "#eeeeee",
      margin: 10
  }
})

export default Setup
