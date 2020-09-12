import React, {useState, useEffect} from "react"
import '../styles/genres.css'
import axios from 'axios'
import { Link } from "react-router-dom"
import queryString from 'querystring'




function GenresBlock() {
    
    const [genres, setGenres] = useState([])
    const {page=1} = queryString.parse(window.location.search)

    useEffect(()=>{
        axios.get('https://limitless-reef-63867.herokuapp.com/api/genres/').then(
            response =>{
                
                    setGenres(response.data)
            
            }
        )
    })

    return (
        <div className="genres  col xl2 l2 m2 s12">
            <div className = "genres__wrapper">
                    <ul className="genres__items">
                      
                    {genres?.map((genre) =>{
                            return(
                            <li   key={genre.movieGenre} className="genres__item sidenav-close"><Link to={`?genre=${genre.id}&page=${page}`}>{genre.movieGenre}</Link></li>
                            )
                        })}

                    </ul>
            </div>
           
            </div>
    )
}

export default GenresBlock

