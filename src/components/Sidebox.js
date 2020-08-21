import React,{useEffect, useState} from 'react'
import '../styles/sidenav.css'
import M from 'materialize-css'
import axios from "axios"

export default class Sidenav extends React.Component {
    state = {
        genres:[]
     }
 
  componentDidMount= () =>
     {
         axios.get('https://limitless-reef-63867.herokuapp.com/api/genres/').then(
             response =>{
               
                var elem = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elem);
                 this.setState({
                     genres:response.data
                 })
             
             }
         )
     }
     onSidenavGenreClick = (id) =>{
        this.props.filterMoviesByGenres(id)
        document.addEventListener('DOMContentLoaded', function() {
            
            var elems = document.querySelectorAll('.sidenav');
            
            var instance = M.Sidenav.getInstance(elems);
            instance.close()
            
          });
       
    }
    render() {
      
      
        
       

       
        return (
           
            
           
            <ul id="slide-out" class="sidenav">
                {this.state.genres.map((genre) =>{
                        return(
                        <li onClick = {
                           
                          e=>{ this.onSidenavGenreClick(genre.id)}

                        }
                            key={genre.movieGenre}  className="sidenav__genre sidenav-close">
                                {genre.movieGenre}
                        </li>
                        )
                    })}
               
            </ul>
           
                  
                
           
        )
    }
}
