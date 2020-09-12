import React,{useState, useEffect} from "react"
import 'materialize-css'
import GenresBlock from '../components/GenresBlock'
import MovieCard from '../components/MovieCard'
import Sidebox from '../components/Sidebox'
import SearchBlock from '../components/SearchBlock'
import queryString from 'query-string'
import '../styles/allMovies.css'
import '../styles/pagination.css'
import axios from "axios"
import { Link } from "react-router-dom"
function AllMovies()
{
    const [movies, setMovies] = useState([])
    const [page_count, setPage_count] = useState(0)
    const [query, setQuery] = useState("")
    const {genre="",page=1} = queryString.parse(window.location.search)
    

   
    useEffect(()=>{
      
        console.log(genre,page)
            if(genre)
            {
               
                axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?movieGenre=${genre}&page=${page}`).then(
                    response =>{
                      
                     //   window.sessionStorage.setItem("current_page_number",1)
                        setMovies(response.data.results)
                        setPage_count(Math.ceil(response.data.count/3))
                        setQuery(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?movieGenre=${genre}&page=${page}`)
                       
                    }
                )
            }
          
            else
            {
                axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?page=${page}`).then(
                        response =>{
                         
                        //    window.sessionStorage.setItem("current_page_number",1)
                            setMovies(response.data.results)
                            setPage_count(Math.ceil(response.data.count/3))
                            setQuery(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?page=${page}`)
                        
                        })
             }
    },[genre,page])

   // Callback function for GenresBlock
  

    // Callback function for SearchBlock component
   const searchMovies = (searchQuery) =>
    {
        // If Search button was clicked then update state with movies which was found
        axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?search=${searchQuery}`).then(
            response =>{
             
                setMovies(response.data.results)
                setPage_count(Math.ceil(response.data.count/3))
                setQuery(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?search=${searchQuery}&`)
                
            }
        )
    }
  const  getPages = () =>
    {
        const items = []
       
      
        for (let i=0;i<page_count;i++)
        {
            
        
            if(i+1 === Number(page))
                items.push(  <Link  key={i+1}  to={`?genre=${genre}&page=${i+1}`} className="pagination-item active">{i+1}</Link>)
            else
                items.push(  <Link  key={i+1}  to={`?genre=${genre}&page=${i+1}`} className="pagination-item">{i+1}</Link>)
        }
        return items
    }

   
        return(
        <div id="all-movies" className = "all-movies row">
              
                <GenresBlock />
                <SearchBlock searchMovies={searchMovies} />
                <div id="all-movies-wrapper" className="all-movies-wrapper offset-l1 offset-xl1 col l9 xl9 m12">
                
                  {
                      // Displays All Movies
                    movies.map(movie=>{ 
                    return(

                        <MovieCard key={movie.id} movie = {movie} />
                        
                    )
                     
                  })}
                   
                </div>
                <div className="pagination col lx12 l12 m12 s12">
                    <div className = "pagination-wrapper">

                        <ul className="pagination-items">

                            {getPages()}
                           
                        </ul>

                    </div>
                </div>
         </div>
        )
    }

export default AllMovies