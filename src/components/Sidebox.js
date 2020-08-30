import React,{useEffect, useState} from 'react'
import '../styles/sidenav.css'
import M from 'materialize-css'
import axios from "axios"
import GenresBlock from './GenresBlock'
export default class Sidenav extends React.Component {
    render() {

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);
          });
        return (
           
            
           
            <ul id="slide-out" className="sidenav">
                <GenresBlock />
            </ul>
           
                  
        )
    }
}
