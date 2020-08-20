import React from "react"
import 'materialize-css'
import GenresBlock from '../components/GenresBlock'
import MovieCard from '../components/MovieCard'
import SearchBlock from '../components/SearchBlock'
import '../styles/allMovies.css'
import '../styles/pagination.css'
import axios from "axios"
class AllMovies extends React.Component
{
    state = {
        movies:[],
        page_count:0,

        // Query will change according to what we selected (filtering by genres or titles) for making a correct query for pagination
        query:""
        
      
    }


    componentDidMount = () =>
    {

        // Check if we have page number in sessions then assign it otherwise it will start from 1
        let page_number = window.sessionStorage.getItem('current_page_number') ? window.sessionStorage.getItem('current_page_number') : 1 
        axios.get(`http://127.0.0.1:8000/api/all_movies/?page=${page_number}`).then(
            response =>{

                this.setState({movies:response.data.results,
                               page_count:Math.ceil(response.data.count/3),
                               query:`http://127.0.0.1:8000/api/all_movies/?`})
               
            }
        )
    }
    // Callback function for GenresBlock
    filterMoviesByGenres = (genreId) =>
    {
        // If user selected some genre then update state with movies with selecte genres
      
        axios.get(`http://127.0.0.1:8000/api/all_movies/?movieGenre=${genreId}`).then(
            response =>{
                console.log(response.data.results)
                window.sessionStorage.setItem("current_page_number",1)
                this.setState({movies:response.data.results,
                    page_count:Math.ceil(response.data.count/3),
                    query:`http://127.0.0.1:8000/api/all_movies/?movieGenre=${genreId}&`})
            }
        )
    }

    // Callback function for SearchBlock component
    searchMovies = (searchQuery) =>
    {
        // If Search button was clicked then update state with movies which was found
        axios.get(`http://127.0.0.1:8000/api/all_movies/?search=${searchQuery}`).then(
            response =>{
                window.sessionStorage.setItem("current_page_number",1)
                this.setState({movies:response.data.results,
                    page_count:Math.ceil(response.data.count/3),
                    query:`http://127.0.0.1:8000/api/all_movies/?search=${searchQuery}&`})
            }
        )
    }
    getPages = () =>
    {
        const items = []
        let current_page_number = window.sessionStorage.getItem('current_page_number') ? window.sessionStorage.getItem('current_page_number') :1 
      
        for (let i=0;i<this.state.page_count;i++)
        {
            
            if(i+1 === Number(current_page_number))
                items.push(  <li onClick={e=>this.onPageClick(e)} key={i+1} className="pagination-item active">{i+1}</li>)
            else
                items.push(  <li onClick={e=>this.onPageClick(e)} key = {i+1 }className="pagination-item">{i+1}</li>)

            
        }
        return items
    }



    onPageClick = (e) =>
    {

    
        let current_page_number = e.target.innerText
       


       
        var current_item = document.getElementsByClassName("active")   
        // Remove active class from current element 
        current_item[0].className = current_item[0].className.replace(" active","")
        // Add active class to the item which was clicked
        e.target.className+=" active"
      
       
        axios.get(`${this.state.query}page=${current_page_number}`).then(
            response =>
            
            {
                // Saving the current number of page in Session storage for saving the current page number in case of if user will refresh the page 
                window.sessionStorage.setItem('current_page_number',current_page_number)
               
                var all_movies = document.getElementById("all-movies")
                all_movies.scrollIntoView(true)
                this.setState({movies:response.data.results,
                    page_count:Math.ceil(response.data.count/3)})
               
            
            }
        )
    }
    render()
    {
        return(
        <div id="all-movies" className = "all-movies row">

                <GenresBlock filterMoviesByGenres={this.filterMoviesByGenres} />
                <SearchBlock searchMovies={this.searchMovies} />
                <div id="all-movies-wrapper" className="all-movies-wrapper offset-l1 offset-xl1 col l9 xl9 m10">
                
                  {
                      // Displays All Movies
                    this.state.movies.map(movie=>{ 
                    return(

                        <MovieCard key={movie.id} movie = {movie} />
                        
                    )
                     
                  })}
                   
                </div>
                <div className="pagination col lx12 l12 m12 s12">
                    <div className = "pagination-wrapper">

                        <ul className="pagination-items">

                            {this.getPages()}
                           

                          
                     

                        </ul>

                    </div>
                </div>
         </div>
        )
    }
}
export default AllMovies