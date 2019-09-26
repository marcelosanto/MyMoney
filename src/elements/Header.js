import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../imgs/contabilidade.svg'

const Header = () => {
  return (
    <nav className='navbar navbar-light bg-light'>
    
      <div className='container'>
      
        <Link className='navbar-brand' to='/'><img className="d-inline-block align-top" src={Logo} width="30" height="30"/>  MyMoney</Link>
      </div>

    </nav>
  )
}

export default Header