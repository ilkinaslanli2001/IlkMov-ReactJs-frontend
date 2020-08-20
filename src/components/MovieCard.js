import React from "react"
import 'materialize-css'
import '../styles/moviecard.css'
import {Link} from 'react-router-dom'
class AllMoviesCard extends React.Component
{
    truncateText = (text) =>
    {
        return text.length > 280 ? text.substring(0,200)+"...":text
    }
    render(){
        
        return(
            <div className="moviecard">
               <div className="moviecard__wrapper row">
                    <div className="moviecard__content col l8 xl6 m7 s10">
                            <h1 id="moviecard__title">{this.props.movie.movieTitle+" ("+ new Date(this.props.movie.moviePremierDate).getFullYear()+")"}</h1>
                            
                                <p id="moviecard__description">
                                    {
                                        this.truncateText(this.props.movie.movieDescription)
                                    }
                               
                                </p>
                    
                         
                                <ul className="moviecard__genres-items">
                                     
                                    {
                                        // Displays movie's genres
                                        this.props.movie.movieGenre.map((genre) =>{
                                        return <li className="moviecard__genre-item" key={genre.movieGenre}>{genre.movieGenre}</li>
                                        })
                                    }
                                </ul>
                           
                    </div>
                    
                   <Link to={{pathname:`movie/${this.props.movie.id}` }}>
                    <div className="moviecard__image-wrapper col l4 s12 xl3 m5">
                        <span className="moviecard__button">Watch <i class="material-icons">weekend</i></span>
                      
                         <img alt={this.props.movie.movieTitle} src={this.props.movie.moviePoster} className="moviecard__image"></img>
                        
                    </div>
                    </Link>
                  
                </div>
              
            </div>
        )
    }
}
export default AllMoviesCard