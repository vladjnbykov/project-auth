/* eslint-disable linebreak-style */

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

import './login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null)

  const accessToken = useSelector((store) => store.user.accessToken)
  const errors = useSelector((store) => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  // trigger useEffect each time accessToken value changes
  useEffect(() => {
    // redirect user to '/' path
    if (accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              username: data.username,
              accessToken: data.accessToken
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
  }

  return (
    <div>
      <form className="form" onSubmit={onFormSubmit}>
        <h2 className="title-inlogning">Welcome to secret notes</h2>
        <h5 className="text-btn">username</h5>
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <h5 className="text-btn">password</h5>

        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-signin" onClick={() => setMode('signin')}>Sign in</button>
        <button type="submit" className="btn-signup" onClick={() => setMode('signup')}>Sign up</button>

      </form>
      {errors && <div className="errors">{errors.message}</div>}
    </div>

  )
}

export default Login
