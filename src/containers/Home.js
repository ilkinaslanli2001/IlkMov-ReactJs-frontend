import React from "react"
import NewMovie from '../components/NewMovie'
import AllMovies from './AllMovies'

class Home extends React.Component
{
    render()
    {
        
        return(
            <div  className= "container-fluid">
                    <NewMovie/>

                    <AllMovies  genreId={this.props.match.params.id}/>
                    
            </div>
        )
    }
}
export default Home