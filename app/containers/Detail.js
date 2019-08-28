import React, { Component } from 'react'
import { StyleSheet,Text, View } from 'react-native'
import { connect } from 'react-redux'

/* import {
  GraphQLClient,
  ClientContext,
  useQuery,
  useMutation,
  useManualQuery
} from 'graphql-hooks' */

import { Button } from '../components'

import { NavigationActions, createAction } from '../utils'


/* const GET_PRODUCTS = `
  query {
    words {
      id
      spell
      symbol
    }
  }
`; */

const GET_PRODUCTS = `
  query {
    textbooks {
      id
      name
      grade
    }
  }
`;

function Posts() {
  //const { loading, error, data, refetch } = useQuery(GET_PRODUCTS)
  
  //console.log(data);

  return (
    <Text onPress={this.goql}>test hooks </Text>
  )
}

@connect(({ app }) => ({ ...app }))
class Detail extends Component {

  static navigationOptions = {
    title: '测试',
  }

  componentWillUnmount() {
    
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }

  goql = () => {
    this.props.dispatch(createAction('app/queryGraph')({ql:GET_PRODUCTS}))
  }

  render() {

    return (
      <View style={styles.container}>
        <Button text="返回" onPress={this.goBack} />
        <Button text="测试请求" onPress={this.goql} />
        <Posts />
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
})

export default Detail
