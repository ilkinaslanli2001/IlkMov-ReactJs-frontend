import React from "react"
import 'materialize-css'
import '../styles/movieWatch.css'
import axios from "axios"
import M from 'materialize-css'
import SimilarMovies from './SimilarMovies'
import Comments from './Comments'
class MovieWatch extends React.Component
{
    state = {
        movie:{
            movieid:-1,
            movieTitle:"Loading...",
            movieTrailer:"",
            movieGenres:[],
            movieFull:"",
            movieDescription:"",
            movieImage:"",
            movieCountry:[],
            moviePremierDate:""
        },
        similar_movies :[]
        
    }
   
    componentDidMount()
    {
        var all_movies = document.getElementById("movie-about_block")
        all_movies.scrollIntoView(true)
        const MOVIE_ID = this.props.match.params.id
        
        var query = "?"
        axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/${MOVIE_ID}`).then(
            response =>{
                this.setState({
                   movie:{
                       movieId:response.data.id,
                       movieTitle:response.data.movieTitle,
                       movieGenres:response.data.movieGenre,
                       movieDescription:response.data.movieDescription, 
                       movieFull:response.data.movieFull,
                       moviePoster:response.data.moviePoster,
                       movieCountry:response.data.movieCountry,
                       moviePremierDate:response.data.moviePremierDate,
                       movieDuration:response.data.movieDuration,
                       movieTrailer:response.data.movieTrailer
                   }
                })
               

            // Making query for getting similar movies according to the  genres of existing movie ]
            // Example of query: http://127.0.0.1:8000/api/all_movies/?movieGenre=4 (where 4 is genre id)
              response.data.movieGenre.map((genre) =>{
                 
                   query += "movieGenre="+ genre.id+"&"
              })
              return axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/${query}`)
               
            }
           
        ).then(
            resposnse =>{
              this.setState({similar_movies:resposnse.data.results})
            
             })
          
      
    }
    getPremierDate()
    {
        // Get day, full month name and year 
        const date = new Date(this.state.movie.moviePremierDate)
        const month = date.toLocaleString('en-GB', {month:'long'})
        return date.getDate()+" "+month+" "+date.getFullYear()
    }
    
    render()
     { 
       
        var elems = document.querySelectorAll('.tabs');
        var instance = M.Tabs.init(elems);
        return(
            <div  className = "container-fluid">
                <div className="row">
                    <div id="movie-about_block" className="col xl9 l12 m12 s12   movie-about_block">
                        <div className = "row">
                            <div className = "movie-main-information  col xl3 l5 m4 s12">
                                <img alt={this.state.movie.movieTitle} src={this.state.movie.moviePoster}  className="movie-poster"  />
                                <div className="movie-info_block">
                                     <div className="movie-info_items ">
                                      
                                        <h2 id="movie-info_item">Premier Date: {this.getPremierDate()}</h2>
                                        <h2 id="movie-info_item"> Country: {this.state.movie.movieCountry.name}</h2>
                                        <h2 id="movie-info_item"> Duration: {this.state.movie.movieDuration} minutes</h2>
                                       
                                    </div>
                       
                                </div>
                            </div>
                         
                           
                              
                            <div className="movie-description_block col offset-xl1 xl8 l7 m8 s12 ">
                            <h1 id="title">{this.state.movie.movieTitle+" "+new Date(this.state.movie.moviePremierDate).getFullYear()}</h1>
                            <ul className="movie-genres">
                                        
                                        {
                                            this.state.movie.movieGenres.map((genre) =>{
                                            return <li id="genre-item" key={genre.movieGenre}>{genre.movieGenre}</li>
                                            })
                                        }
                                    
                                    </ul>
                  
                            <p className="movie-description">{this.state.movie.movieDescription} </p>
                               
                             
                          
                                <ul className="tabs">
                                    <li className="tab col s3"><a href="#trailer">Trailer</a></li>
                                    <li className="tab col s3"><a class="active" href="#fullmovie">Full Movie</a></li>
                                </ul>
                            
                            <div id="trailer" > 
                            <div classNames="video-container">
                                <iframe className="movie-trailer"  width="100%" src={this.state.movie.movieTrailer} 
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen></iframe>
                            </div>
                            

                            </div>
                            <div id="fullmovie" >
                                <video src={this.state.movie.movieFull} className="responsive-video" controls  />
                               
                            </div>
                           
                            <Comments movieTitle={this.state.movie.movieTitle} movieId = {this.state.movie.movieId}/>
                               
                               
                                
                           </div>     
                            
                        </div>
                    </div>
                </div>
                <div className = "row">
                    <div className = "other-movies_block col xl12 l12 m12 s12">
                        {
                            this.state.similar_movies.map((similar_movie,id) =>{
                            // Show  only 6 movies 
                            if(similar_movie.id!==this.state.movie.movieId && id<=6)
                                return(   <SimilarMovies key = {id} movie={similar_movie} />)
                            })
                        }
                      </div>
                  </div>
               
            </div>
        )
    }

}
export default MovieWatch