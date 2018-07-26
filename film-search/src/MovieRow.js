import React, { Component } from 'react';

class MovieRow extends Component {

    viewMovie(){
        // console.log("Trying to view movie")
        console.log(homepageURL)
        const homepageURL = "https://www.themoviedb.org/movie/" + this.props.movie.id
        window.location.href = homepageURL
    }


    render(){
        return(
            <table key={this.props.movie.id}>
                <tbody>
                    <tr>
                        <td>
                            <img width="120" src={this.props.movie.poster_src} alt="poster"/>
                        </td>
                        <td id="titleSpace">
                            <h3>{this.props.movie.title}</h3>
                            <p>{this.props.movie.overview}</p>
                            <input type="button" onClick={this.viewMovie.bind(this)} value="View"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default MovieRow