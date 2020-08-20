import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './containers/Home'
import MovieWatch from './components/MovieWatch'
import Header from './components/Header'
import UserAuth from './containers/UserAuth'
import SignUp from './components/SignUp'
import React from "react"

function Routing(params) {
    return(
    <Router>
          <Header /> 
        <Switch>
            <Route path = '/login'   component={UserAuth}></Route>
            
            
            <Route path='/signup' component={SignUp}></Route>
            <Route path='/movie/:id'  component = {MovieWatch}></Route>
            <Route path='/' exact component={Home}></Route>
            
        </Switch>
    </Router>)
}
export default Routing