import React, {useState} from "react"
import   'materialize-css'
import '../styles/header.css'
import { Link, useHistory } from "react-router-dom"
import {useStateValue} from '../StateProvider'
import logo from '../images/ILKMOV__logo.png'

function Header()
{
  
    
    
    
    const [{user}, dispatch] = useStateValue()
    const history = useHistory()
    const logoutUser=() =>
    {
        dispatch({
            type:'LOGOUT_USER'
        })
    }
   const onLogoClick = () =>{
        localStorage.setItem('current_page_number',1)
        history.push('/')
   }
    
     
    
    return(
        <ul className = "header">

                <li className="header__item-hamburger">
                    <div  data-target="slide-out"   className="header__hamburger sidenav-trigger">
                        <span  className="header__hamburger-stick"></span>
                        <span className="header__hamburger-stick"></span>
                        <span className="header__hamburger-stick"></span>
                    </div>
                </li>
                <li className="header__item "><img onClick={onLogoClick} className="header__logo" src={logo} /></li>
                <li className="header__item browser-default header__login" >
                    {user ? <p className="header__username"><span>{user} <i class="material-icons">arrow_drop_down</i></span>
                       <ul className="header__dropdown">
                            <li onClick={logoutUser} className="header__dropdown-item">Logout</li>
                        </ul></p> : <Link replace to='/login'>Sign In</Link> }</li>
                  
        </ul>
    )
    
}
export default Header