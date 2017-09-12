import axios from 'axios'
import * as userActions from './actions/user'

const BASE_URL = '/api';

export const login = (user) => {
  const { username, password } = user

  return axios.post(`${BASE_URL}/auth/login`, user)
    .then(res => {
      localStorage.setItem('token', res.headers['x-access-token'])
      return userActions.logIn(res.data)
    })
}

export const logOut = () => {
  return axios.get(`${BASE_URL}/auth/logout`)
    .then(res => userActions.logOut())
}

export const signUp = (user) => {
  return axios.post(`${BASE_URL}/auth/signup`, user)
    .then(res => {
      return { res, type: "" }
    })
}

export const getCurrentUser = (user) => {
  return axios.get(`${BASE_URL}/auth/currentUser`)
    .then((res) => {
      if (res.data) return userActions.logIn(res.data)
      return { type: "" }
    })
}