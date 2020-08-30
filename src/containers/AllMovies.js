import React,{useState, useEffect} from "react"
import 'materialize-css'
import GenresBlock from '../components/GenresBlock'
import MovieCard from '../components/MovieCard'
import Sidebox from '../components/Sidebox'
import SearchBlock from '../components/SearchBlock'
import '../styles/allMovies.css'
import '../styles/pagination.css'
import axios from "axios"
function AllMovies({genreId})
{
    const [movies, setMovies] = useState([])
    const [page_count, setPage_count] = useState(0)
    const [query, setQuery] = useState("")
   

   
    useEffect(()=>{
            if(genreId)
            axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?movieGenre=${genreId}`).then(
                    response =>{
                        console.log(response.data.results)
                        window.sessionStorage.setItem("current_page_number",1)
                        setMovies(response.data.results)
                        setPage_count(Math.ceil(response.data.count/3))
                        setQuery(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?movieGenre=${genreId}&`)
                       
                    }
                )
            else
            {
                axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/`).then(
                        response =>{
                         
                            window.sessionStorage.setItem("current_page_number",1)
                            setMovies(response.data.results)
                            setPage_count(Math.ceil(response.data.count/3))
                            setQuery(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?`)
                        
                        })
             }
    },[genreId])

   // Callback function for GenresBlock
  

    // Callback function for SearchBlock component
   const searchMovies = (searchQuery) =>
    {
        // If Search button was clicked then update state with movies which was found
        axios.get(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?search=${searchQuery}`).then(
            response =>{
                window.sessionStorage.setItem("current_page_number",1)
                setMovies(response.data.results)
                setPage_count(Math.ceil(response.data.count/3))
                setQuery(`https://limitless-reef-63867.herokuapp.com/api/all_movies/?search=${searchQuery}&`)
                
            }
        )
    }
  const  getPages = () =>
    {
        const items = []
        let current_page_number = window.sessionStorage.getItem('current_page_number') ? window.sessionStorage.getItem('current_page_number') :1 
      
        for (let i=0;i<page_count;i++)
        {
            
            // if(i+1 === Number(current_page_number))
            //     items.push(  <li onClick={e=>onPageClick(e)} key={i+1} className="pagination-item active">{i+1}</li>)
            // else
            //     items.push(  <li onClick={e=>onPageClick(e)} key = {i+1 }className="pagination-item">{i+1}</li>)

            if(i+1 === Number(current_page_number))
                items.push(  <li onClick={e=>onPageClick(e)} key={i+1} className="pagination-item active">{i+1}</li>)
            else
                items.push(  <li onClick={e=>onPageClick(e)} key = {i+1 }className="pagination-item">{i+1}</li>)
        }
        return items
    }



  const  onPageClick = (e) =>
    {

    
        let current_page_number = e.target.innerText
       


       
        var current_item = document.getElementsByClassName("active")   
        // Remove active class from current element 
        current_item[0].className = current_item[0].className.replace(" active","")
        // Add active class to the item which was clicked
        e.target.className+=" active"
      
       
        axios.get(`${query}page=${current_page_number}`).then(
            response =>
            
            {
                // Saving the current number of page in Session storage for saving the current page number in case of if user will refresh the page 
                window.sessionStorage.setItem('current_page_number',current_page_number)
               
                var all_movies = document.getElementById("all-movies")
                all_movies.scrollIntoView(true)
                setMovies(response.data.results)
                setPage_count(Math.ceil(response.data.count/3))
               
            
            }
        )
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