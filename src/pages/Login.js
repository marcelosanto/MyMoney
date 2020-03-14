import React, { useEffect, useState } from 'react'
import { usePost } from '../utils/rest'
import { Redirect } from 'react-router-dom'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnQj7ZYdGUL3tyIiWfe4xo3ChKJKfcNxo'

const Login = () => {
  const [postData, signin] = usePost(url)
  const [logado, setLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem('token', postData.data.idToken)
      window.location.reload()
    }
  }, [postData])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogado(true)
    }
  })
  const login = async () => {
    await signin({
      email,
      password: senha,
      returnSecureToken: true
    })
  }
  const onChangeEmail = evt => {
    setEmail(evt.target.value)
  }
  const onChangeSenha = evt => {
    setSenha(evt.target.value)
  }
  if (logado) {
    return <Redirect to='/' />
  }
  return (
    <div>
      <h1>Login</h1>
      {
        postData.error && postData.error.length > 0 &&
        <p>Email e/ou senha inválidos</p>
      }
      <div className="form-group">
      <input type='text' className="form-control" value={email} onChange={onChangeEmail} placeholder='Seu Email' />
      </div>

      <div className="form-group">
      <input type='password' className="form-control" value={senha} onChange={onChangeSenha} placeholder='Sua Senha' />
      </div>
      <button onClick={login}>Login</button>
    </div>

  )
}

export default Login