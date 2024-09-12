import { useState, useEffect } from 'react';
import { useSearchParams, useLocation} from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import axios from "axios";
import { API_KEY, BASE_URL } from "../../services/api";
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchQuery = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (!searchQuery) {
      fetchMovies(searchQuery);
    } else {
      setMovies([]);
    }
      setQuery('');
      fetchMovies(searchQuery);
  }, [searchQuery, location.pathname]);

  const fetchMovies = async (searchQuery) => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query: searchQuery, include_adult: false, language: 'en-US' },
      });
      setMovies(response.data.results);
    } catch (error) {
      setError("Failed to fetch movies. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ query }); 
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className={css.input}
        />
        <button className={css.btn} type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}