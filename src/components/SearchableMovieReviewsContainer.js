import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'rbgNFGf1AnUWEhS0qTGY8I2twIBG8GGq';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
class SearchableMovieReviewsContainer extends Component {
    constructor() {
        super()
        this.state = {
            searchTerm: "",
            reviews: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({searchTerm: event.target.searchTerm.value})
        fetch(`${URL}&query=${event.target.searchTerm.value}`)
        .then(res => res.json())
        .then(data => {
            this.setState({reviews: data.results})
        })
        event.target.searchTerm.value = ""
    }



    render() {
        return (
            <div className="searchable-movie-reviews">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="searchTerm"></input>
                    <input type="submit" value="Search"></input>
                </form>
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}

export default SearchableMovieReviewsContainer