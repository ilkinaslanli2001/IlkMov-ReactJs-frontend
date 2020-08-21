import React, {useEffect} from 'react';
import Routing from './Routing'
import Home from './containers/Home'
import Footer  from './components/Footer'
import axios from "axios"
import {useStateValue} from './StateProvider'
import './styles/common.css'
import   'materialize-css'

function App() {
  const [{user}, dispatch] = useStateValue()

  useEffect(()=>{
    let ACCESS_TOKEN = undefined
    const REFRESH_TOKEN = localStorage.getItem('refresh')
    if(!user && REFRESH_TOKEN)
    {

      axios.post('https://limitless-reef-63867.herokuapp.com/auth/jwt/refresh/',{
        refresh:REFRESH_TOKEN
      }).then(
        
        response =>{
         
          ACCESS_TOKEN = response.data.access
          return axios.get("https://limitless-reef-63867.herokuapp.com/auth/users/me",{
            headers:{
              Authorization:`JWT ${ACCESS_TOKEN}`
            }
          }).then(
            response =>{
             
              dispatch({
                type:'SET_USER',
                refresh:REFRESH_TOKEN,
                access:ACCESS_TOKEN,
                user:response.data.username
              })
            }
          ).catch(
           
          )
      }
      ).catch(
       
        dispatch({
          type:'LOGOUT_USER'
        })
        
      )
    }
   
   
     
     
    
  },[])
  return (
    <div className="App">
    

      <Routing>

        <Home />

      </Routing>
    <Footer />
    </div>
  );
}

export default App;
