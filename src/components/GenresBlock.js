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
        axios.get('https://limitless-reef-63867.herokuapp.com/api/genres/').then(
            response =>{
                this.setState({
                    genres:response.data
                })
            
            }
        )
    }
    render(){
    
        return(
            <div className="genres  col xl2 l2 m2 s12">
            <div className = "genres__wrapper">
                    <ul className="genres__items">
                      
                    {this.state.genres.map((genre) =>{
                            return(
                            <li onClick={e => this.props.filterMoviesByGenres(genre.id)}  key={genre.movieGenre} className="genres__item">{genre.movieGenre}</li>
                            )
                        })}

                    </ul>
            </div>
           
            </div>
        )
    }
}
export default GenresBlock