import React, {useState} from "react"
import {Link, useHistory} from 'react-router-dom'
import axios from "axios"
import '../styles/login_signup.css'




function SignUp ()
{

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const onSignUpButtonClick =(event) =>
    {
        event.preventDefault()
        axios.post('https://limitless-reef-63867.herokuapp.com/auth/users/',{
            username,
            email,
            password
        }).then(
            response =>{
                console.log(response)
                history.push('login/')
            }
            
          
        ).catch(error=>{
            console.warn(error)
        })
    }
    
    
   
    return(
    <div className="signup_block">
        <div className="signup_container">
            <form className = "signup_form">
                <h1>Sign Up</h1>
                <span>Username:</span>
                <input value={username} onChange={(event)=>setUsername(event.target.value)} type="text" required className="browser-default" placeholder="Enter your username" />
                <span>Email:</span>
                <input value={email} onChange={(event)=>setEmail(event.target.value)} type="email" required className="browser-default" placeholder="Enter your email" />

                <span className="span">Password:</span>
                <input value={password} onChange={(event)=>setPassword(event.target.value)} className="browser-default" required type="password" placeholder="Enter your Password" />

                <button onClick={onSignUpButtonClick} type="submit" className="login_button">Sign Up</button>
            </form>
            <div className="links_block">
                <Link to='/login'>Already have an account?</Link>
                <Link to='/'>Forgot your password?</Link>
            </div>
        </div>
    </div>
    )
    
}
export default SignUp