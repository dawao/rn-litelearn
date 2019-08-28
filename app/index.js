import React from 'react'
import { AppRegistry } from 'react-native'

/* import {
  GraphQLClient,
  ClientContext,
  useQuery,
  useMutation,
  useManualQuery
} from 'graphql-hooks'
 */
import dva from './utils/dva'
import Router, { routerMiddleware, routerReducer } from './router'
import appModel from './models/app'
// import { host } from './utils'

/* import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";

export class ExposedToJava {
  alert(message) {
      alert(message);
  }
}

const exposedToJava = new ExposedToJava();
BatchedBridge.registerCallableModule("JavaScriptVisibleToJava", exposedToJava); */


const app = dva({
  initialState: {},
  models: [appModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

// const token = localStorage.getItem("token");
/* const client = new GraphQLClient({
  url: host + '/graphql',
  headers: {
    // authorization: token ? token : null
  }
});
 
const App = app.start(<ClientContext.Provider value={client}><Router /></ClientContext.Provider>)*/
const App = app.start(<Router />)

AppRegistry.registerComponent('DvaStarter', () => App)
