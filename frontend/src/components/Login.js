/* eslint-disable linebreak-style */
/* eslint-disable */

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Login = () => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[mode, setMode] = useState(null)

    const dispatch = useDispatch()

    const onFormSubmit =(e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }

        fetch(API_URL(mode), options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success) {

                } else {

                }
            })
    }

    return (
        <form onSubmit={onFormSubmit}>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={() => setMode('signin')}>Sign in</button>
            <button type="submit" onClick={() => setMode('signup')}>Sign up</button>


        </form>
    )
}

export default Login
