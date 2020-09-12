import React from "react"
import NewMovie from '../components/NewMovie'
import AllMovies from './AllMovies'
import queryString from 'query-string'
class Home extends React.Component
{
    
    render()
    {
      
       
        return(
            <div  className= "container-fluid">
                    <NewMovie/>

                    <AllMovies/>
                    
            </div>
        )
    }
}
export default Home