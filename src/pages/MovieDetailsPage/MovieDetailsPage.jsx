import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Suspense } from "react";

import axios from 'axios';
import { GoArrowLeft } from "react-icons/go";
import { API_KEY, BASE_URL } from '../../services/api';
import css from './MovieDetailsPage.module.css';

 export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
   const backLink = location.state?.from ?? '/movies';
   const backButtonRef = useRef(null);
  

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: { api_key: API_KEY },
        });
        setMovieData(response.data);
      } catch (error) {
        setError('Failed to fetch movie details.');
      }
    };

    fetchMovieDetails();
    if (backButtonRef.current) {
      backButtonRef.current.focus();
    }
  },
    [movieId]);

  if (error) return <p>{error}</p>;
  if (!movieData) return <p>Loading...</p>;

  return (
    <div className={css.movieDetails}>
      <button className={css.btn} ref={backButtonRef} onClick={() => navigate(backLink)}><GoArrowLeft /> Go back</button>
      <div className={css.movieHeader}>
        <img
          src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : 'defaultImg.jpg'}
          alt={movieData.title}
          className={css.img}
        />
        <div>
          <h2>
            {movieData.title} ({movieData.release_date.split('-')[0]})
          </h2>
          <p>User Score: {movieData.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movieData.overview}</p>
          <h4>Genres</h4>
          <p>{movieData.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div>
        <h3>Additional information</h3>
        <ul className={css.ul}>
          <li>
            <Link to="cast" state={{ from: backLink }} className={css.link}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }} className={css.link}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
        </Suspense>
    </div>
  );
};
