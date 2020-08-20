import React from "react"
import '../styles/genres.css'
import axios from 'axios'
class GenresBlock extends React.Component
{
    state = {
       genres:[]
    }

 componentDidMount= () =>
    {
        axios.get('http://127.0.0.1:8000/api/genres/').then(
            response =>{
                this.setState({
                    genres:response.data
                })
            
            }
        )
    }
    render(){
    
        return(
            <div className="genres-wrapper  col xl2 l2 m2 s12">
            <div className = "genres-display">
                    <ul className="genres-items">
                      
                    {this.state.genres.map((genre) =>{
                            return(
                            <li onClick={e => this.props.filterMoviesByGenres(genre.id)}  key={genre.movieGenre} className="genre-item">{genre.movieGenre}</li>
                            )
                        })}

                    </ul>
            </div>
           
            </div>
        )
    }
}
export default GenresBlock