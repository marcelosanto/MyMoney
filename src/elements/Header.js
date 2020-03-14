import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Logo from '../imgs/contabilidade.svg'


const Header = () => {
  const [logado, setLogado] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogado(true)
    } else {
      setLogado(false)
    }
  })

  const logout = () => {
    localStorage.removeItem('token')
    setLogado(false)
    window.location.reload()
  }
  return (
    <nav className='navbar navbar-light bg-light'>

      <div className='container'>

        <Link className='navbar-brand' to='/'><img className="d-inline-block align-top" src={Logo} width="30" height="30" />MyMoney</Link>
        { logado &&
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <button type='button' onClick={logout} className='btn nav-link' >Sair</button>
            </li>
          </ul>
        }
      </div>

    </nav>
  )
}

export default Header