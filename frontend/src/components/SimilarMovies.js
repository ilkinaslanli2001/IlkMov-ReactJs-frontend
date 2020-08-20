import React from "react"
import '../styles/similarMovies.css'
class SimilarMovies extends React.Component
{

    render()
    {
        return(
            <a href ={`/movie/${this.props.movie.id}`}>
                <div className="similar-movie_block">

                    <div className="dark-img"></div>
                    <img alt={this.props.movie.movieTitle} src={this.props.movie.moviePoster} id="movie-image"></img>
                    <h1 id="movie-title">{this.props.movie.movieTitle}</h1>
                    
                </div>

            </a>
        )
    }
}
export default SimilarMovies