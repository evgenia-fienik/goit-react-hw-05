import React, { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../services/api'; 

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await fetchTrendingMovies();
        setTrendingMovies(response.results); 
      } catch (error) {
        setError('error');
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Trending Today</h1>
      <MovieList movies={trendingMovies} /> 
    </div>
  );
}





    

