import React from "react"

import '../styles/newMovie.css'

import axios from "axios"

import   'materialize-css'
import { Link } from "react-router-dom"
class  NewMovies extends React.Component
{
    
    state = {
        
        movieScreen:[],
        movieTitle:"",
        movieGenres :[],
        movieDescription:""
    }
    
 componentDidMount()
    {
       
        axios.get('https://limitless-reef-63867.herokuapp.com/api/all_movies/').then(
            response =>{
               
               
                if(response.data.results.length >0)
                    this.setState({
                                movieId:response.data.results[0].id,
                                movieScreen:response.data.results[0].movieScreen,
                                movieTitle:response.data.results[0].movieTitle,
                                movieGenres:response.data.results[0].movieGenre,
                                movieDescription:response.data.results[0].movieDescription})
              
            }
        )   
  }
    
    getTrailer = (e) =>
    {
        this.setState({movieTrailer:e})   
    }
  
    render()
    {
      
        
        
        return(
            
            
            <div className="row newmovie " style={{
                backgroundImage:`linear-gradient(45deg, black, transparent),url(${this.state.movieScreen})`}}>
              
                    <div className="newmovie__info">
                    
                            <h2 className="newmovie__title">{this.state.movieTitle}</h2>
                            <p className="newmovie__description">{this.state.movieDescription}</p>
                            
                            <ul className="newmovie__genres">
                                {this.state.movieGenres.map((genre,index) =>{
                                return  <li key={index} className="genre"><Link to={`/genre/${genre.id}`}>{genre.movieGenre}</Link></li>
                                })}
                                
                            </ul>
                            <Link to={`movie/${this.state.movieId}`} className="newmovie__button">Watch</Link>
                    
                        </div>   
             
             
                        
             
            </div>
                    
        )
    }
}
export default NewMovies