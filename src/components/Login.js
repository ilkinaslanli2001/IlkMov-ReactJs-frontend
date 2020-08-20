import React, {useState} from "react"
import '../styles/login_signup.css'
import {Link, useHistory} from 'react-router-dom'
import axios from "axios"
import {useStateValue} from '../StateProvider'
function Login()
{

        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const [errors, setErrors] = useState([])
        const history = useHistory()
        const [{user}, dispatch] = useStateValue()
        const onLoginButtonClick =(event) =>{
            event.preventDefault()
            axios.post("https://limitless-reef-63867.herokuapp.com/auth/jwt/create/",{
                username,
                password
            }).then(
                response =>{
                    
                    dispatch({
                        type:'SET_USER',
                        user:username,
                        access:response.data.access,
                        refresh:response.data.refresh
                    })
                    history.push('/')
                    
                }
            ).catch(
               setErrors([<span key={1} className="login__errors">* Username or password are incorrect</span>])
            )
            
        }
        return(
            <div className="login_block">
                <div className="login_container">
                    <form className = "login_form">
                        <h1>Login</h1>
                        <span>Username:</span>
                        <input value={username} onChange={(event) => {setUsername(event.target.value)}} className="browser-default" type="email"  required  placeholder="Enter your username" />

                        <span className="span">Password:</span>
                        <input value={password} onChange={(event)=>{setPassword(event.target.value)}} className="browser-default" required type="password" placeholder="Enter your Password" />
                        {errors}
                        <button onClick={onLoginButtonClick} type="submit" className="login_button">Login</button>
                    </form>
                    <div className="links_block">
                        <Link to='/signup'>Don't have an account?</Link>
                        <Link to='/'>Forgot your password?</Link>
                    </div>
                </div>
            </div>
        )
    }
export default Login