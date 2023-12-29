import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import SearchBar from './SearchBar';
import './App.css';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  /**
   * Fetches movies from OMDB API using user's query.
   */
  const fetchMovies = async () => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${query}`);
    setMovies(response.data.Search || []);
  };

  /**
   * When clicking on the search button, fetches movies and displays them under the website's header on the home page.
   * @param {*} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query) {
      fetchMovies();
      navigate('/');
    }
  };

  /**
   * When clicking on the website's title, brings to user back to the home page.
   * It also clears the query and the previous search results.
   */
  const handleTitleClick = () => {
    setQuery('');
    setMovies([]);
    navigate('/');
  };

  /**
   * Creates movie tile items for displaying in a list.
   * @param {*} param0 
   * @returns 
   */
  const MovieListItem = ({ movie }) => (
    <div className="movie">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title" onClick={handleTitleClick}>Movie Mashup</h1>
        <SearchBar query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
      </header>

      <Routes>
        <Route path="/" exact element={
          <div className="movie-list">
            {movies.map(movie => <MovieListItem key={movie.imdbID} movie={movie} />)}
          </div>
        } />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
