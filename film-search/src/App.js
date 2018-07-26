import React, { Component } from 'react'
import './App.css'
import MovieRow from './MovieRow';
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    console.log("this is my initialiser")

    this.state = {
      rows: []
    }

    // const movies = [
    //   {
    //     id:0,
    //     poster_src:"https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg", 
    //     title: "Interstellar", 
    //     overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    //   },
    //   {
    //     id:1, 
    //     poster_src:"https://m.media-amazon.com/images/M/MV5BNGM2NjQxZTAtMmU5My00YTk5LWFmOWMtYjZlYzk4YzMwNjFlXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
    //     title: "Fight Club", 
    //     overview: "An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soapmaker."
    //   }
    // ]
    
    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie}/>
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}

    
  }

  performSearch(searchTerm) {
    console.log("Perform search using movie db")
    const urlString = "https://api.themoviedb.org/3/search/movie?&api_key=a8c17f01fb3b42d380b02a3523e01a6c&query=" + searchTerm
    $.ajax({
      url: urlString,
      success:(searchResults) => {
        console.log("Fetched data successfully")
        const results = searchResults.results

        var movieRows = []
        results.forEach((movie) => {
          if (movie.poster_path != null) {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          }else {
            movie.poster_src = null
          }
         
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({
          rows:movieRows
        })
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event){
    this.performSearch(event.target.value)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <h1>Film Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: '100%'
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Search"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
