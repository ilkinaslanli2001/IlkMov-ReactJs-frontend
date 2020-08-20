import React from "react"
import Login from '../components/Login'
import 'materialize-css'



export default class UserAuth extends React.Component
{
    render()
    {
        return(
         
                <div className = 'container-fluid'>
                    <div className="user-auth_wrapper row">
                        <div className="user-auth">
                            <Login></Login>
                        </div>
                    </div>
                    </div>
         
        )
    }
}