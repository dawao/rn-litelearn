import { AsyncStorage } from 'react-native';

import { delay, post } from '../utils'

// Set user token and info locally (AsyncStorage)
export function setUserLocally(token, user) {
  // Set token
  AsyncStorage.setItem('token', token)
  AsyncStorage.setItem('user', JSON.stringify(user))
}

// Unset user token and info locally (AsyncStorage)
export function unsetUserLocally() {
  // Remove token
  AsyncStorage.removeItem('token')
  AsyncStorage.removeItem('user')
}

// User Authentication
(async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    
    if (token && token !== 'undefined' && token !== '') {
      //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const user = JSON.parse(await AsyncStorage.getItem('user'))
      if (user) {
        //store.dispatch(setUser(token, user))
        setUserLocally(token, user)

        console.log('User logged in.')
      }
    } else {
      // delete axios.defaults.headers.common['Authorization'];
    }
  } catch (e) {
    console.log('Failed to login user.')
  }
})()

export const login = async (param) => {
  await delay(200)
  const { username, password} = param
  let response = await post('/auth/local',{body: {"identifier": username, "password": password}})
  // let response = await post('http://192.168.0.51:8080/api/authenticate',{body: {"username": "admin", "password": "admin", "rememberMe": false}})
  console.log(response)
  if(response && response.body){
    console.log('Well done!');
    console.log('User profile', response.body.user);
    console.log('User token', response.body.jwt);
    const token = response.body.jwt || response.body.id_token
    const user = response.body.user
    
    setUserLocally(token, user)
  }

  return true
}
