import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
  createSwitchNavigator,
  SwitchActions
} from 'react-navigation'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Loading from './containers/Loading'
import Login from './containers/Login'
import LoginScreen from './containers/LoginScreen2'
import LoadingScreen from './containers/LoadingScreen' 
import Register from './containers/Register'
import Setting from './containers/setting'
import Home from './containers/Home'
import Account from './containers/Account'
import Detail from './containers/Detail'

import ProductScreen from './containers/ProductScreen'
import ProductDetailsScreen from './containers/ProductDetailsScreen'
import ProductAddScreen from './containers/ProductAddScreen'
import ProductEditScreen from './containers/ProductEditScreen'


const HomeNavigator = createBottomTabNavigator({
  Home: { screen: Home },
  Account: { screen: Account },
}, {
  swipeEnabled: true,
  animationEnabled: true,
})

HomeNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index]

  return {
    headerTitle: routeName,
  }
}

const MainNavigator = createStackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Detail: { screen: Detail },
    Product: ProductScreen,
    ProductDetails: ProductDetailsScreen,
    AddProduct: ProductAddScreen,
    EditProduct: ProductEditScreen,
  },
  {
    headerMode: 'none'//'float',// 'none' remove Home and Account Title
  }
)

const UnauthenticatedNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    Login: { screen: Login },
    Setting: { screen: Setting },
    Register: { screen: Register },
  },
  {
    headerMode: 'none',
  }
)

const AppNavigator = createSwitchNavigator(
  {
    Main: { screen: MainNavigator },
    UnApp: { screen: UnauthenticatedNavigator },
    AuthLoading: LoadingScreen,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)

export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
  state => state.router,
  'root'
)

const App = createReduxContainer(AppNavigator, 'root')

// const UnApp = createReduxContainer(UnauthenticatedNavigator, 'root')

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { app, dispatch, router } = this.props
    //const { login } = app
    if (app.loading) return <Loading />
    //if (login) 
      return <App dispatch={dispatch} state={router} />
    //return <UnApp dispatch={dispatch} state={router} />
  }
}

export default Router
