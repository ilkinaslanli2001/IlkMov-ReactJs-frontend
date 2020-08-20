import React from "react"

import '../styles/searchBlock.css'
class SearchBlock extends React.Component
{
    state = {
        searchInput:""
    }
    onButtonClick = () =>
    {
        this.props.searchMovies(this.state.searchInput)
    }
    render()
    {
        return(
            <div className="search-block col offset-xl4 offset-l4 offset-m3  xl5 l5 m7 s12">
                 
                <input value={this.state.searchInput} 
                 onChange={(e)=>{this.setState({searchInput:e.target.value})}} 
                 id="search-input"
                 placeholder="Search" />

                <button onClick={this.onButtonClick} id="search-btn">Search</button>
                 
            </div>
        )
    }
}
export default SearchBlock