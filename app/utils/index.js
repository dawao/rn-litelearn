import { GraphQLClient } from 'graphql-request'

import AsyncStorage from '@react-native-community/async-storage';

export { NavigationActions, StackActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export const host = 'http://192.168.0.51:1337'

export const post = async (uri , opt) => {
  
    const Frisbee = require('frisbee');
  
    // create a new instance of Frisbee
    const api = new Frisbee({
      // baseURI: '', // optional
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // this is a simple example using `.then` and `.catch`
    // api.post('/auth/local').then(console.log).catch(console.error);
    try {
      // make the request
      let response = await api.post(uri.startsWith('http')?uri:(host + uri),opt)/* .then(response => {
      // Handle success.
      console.log('Well done!');
      console.log('User profile', response.body.user);
      console.log('User token', response.body.jwt);
    }).catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
    }) */;
      if(response && response.body){
        const token = response.body.jwt || response.body.id_token
        if(token)
          api.jwt(token)
      }
      return response
    } catch (err) {
      console.error(err);
      return null
    }
  }

  export const graph = async (query) => {
    const token = await AsyncStorage.getItem("token");
    const graphQLClient = new GraphQLClient( host + '/graphql', {
      headers: {
        Authorization: 'Bearer '+ (token ? token : '')
      },
    })
  
    const data = await graphQLClient.request(query)
    return data
  }