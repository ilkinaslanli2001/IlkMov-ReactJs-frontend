import React from "react"
import   'materialize-css'
import '../styles/header.css'
import { Link } from "react-router-dom"
import {useStateValue} from '../StateProvider'
import logo from '../images/ILKMOV__logo.png'

function Header()
{
  
    
    
    
    const [{user}, dispatch] = useStateValue()
   
    const logoutUser=() =>
    {
        dispatch({
            type:'LOGOUT_USER'
        })
    }
   
    
     
    
    return(
        <ul className = "header">
            
                <li className="header__item header__logo"><Link to='/'><img src={logo} /></Link></li>
                
                <li className="header__item browser-default header__login" >
                    {user ? <p><span>{user} <i class="material-icons">arrow_drop_down</i></span>
                       <ul className="header__dropdown">
                            <li onClick={logoutUser} className="header__dropdown-item">Log out</li>
                        </ul></p> : <Link replace to='/login'>Sign In</Link> }</li>
                  
        </ul>
    )
    
}
export default Header