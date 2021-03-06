import React, { Component } from 'react'
import { ScrollView, StyleSheet,Text, View, ActivityIndicator, TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux'

import SignatureCapture from 'react-native-signature-capture';
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Input, Button, Icon, Image } from 'react-native-elements';

import { NavigationActions, createAction } from '../utils'
import { Pie } from '../components'


@connect(({ app }) => ({ ...app }))
class Detail extends Component {

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
  
  
  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }
  goTest = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'ToTest' }))
  }
  goql = () => {
    this.props.dispatch(createAction('app/queryGraph')({ql:GET_PRODUCTS}))
  }


  render() {

    return (
      <View style={styles.container}>
        
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
        <Image style={{ marginTop: -40,}}
          source={require('../images/51.png')}
 
          PlaceholderContent={<ActivityIndicator />}
        />
        <Image style={{ marginTop: -40,}}
          source={require('../images/52.png')}

          PlaceholderContent={<ActivityIndicator />}
        />
        <Image style={{ marginTop: -40,}}
          source={require('../images/53.png')}

          PlaceholderContent={<ActivityIndicator />}
        />

        <View style={styles.container}>
          <TouchableOpacity onPress={this.goTest}>
          <Image style={{ marginTop: -40,}}
          source={require('../images/54.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
          </TouchableOpacity>
        </View>
        </ScrollView>
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

export default Detail
