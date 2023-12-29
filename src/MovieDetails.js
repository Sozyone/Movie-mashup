import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * Movie details component.
 * API mashup of OMDB for movie information and TMDB for reviews.
 * Happens from one event after clicking a movie tile from the movie list after a search. 
 * @returns a movie details page. 
 */
const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${id}`)
      .then(detailsResponse => setDetails(detailsResponse.data))

    axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`)
      .then(reviewsResponse => setReviews(reviewsResponse.data.results))
      .catch(error => {
        setReviews([]);  // Set reviews to an empty array if an error occurs, sometimes TMDB doesn't have reviews, caused an error.
      });
  }, [id]);

  return (
    <div>
      {details && (
        <div className="movie-details">
          <img src={details.Poster} alt={`${details.Title} Poster`} />
          <h2>{details.Title} ({details.Year})</h2>
          <p>{details.Plot}</p>
        </div>
      )}

      <div>
        <h3>Reviews</h3>
        {reviews && (
          reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="review-container">
                <div className="review-author">{review.author}</div>
                <div className="review-content">{review.content}</div>
              </div>
            ))
          ) : (
            <div>No reviews found.</div> // If TMDB doesn't have reviews.
          )
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
