import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../services/api';
import css from './MovieCast.module.css'

export default function MovieCast() {
  const { movieId } = useParams();  
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  
   useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          params: {
            api_key: API_KEY,
          },
        });
        setCast(response.data.cast || []);
      } catch (error) {
        setError("Failed to fetch movie cast.");
      }
    };

    if (movieId) fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div className={css.castContainer}>
     
      <ul className={css.ul}>
        {cast.map(member => (
          <li key={member.cast_id} className={css.castItem}>
            <img
              src={member.profile_path ? `https://image.tmdb.org/t/p/w500/${member.profile_path}` : 'defaultImg.jpg'}
              alt={member.name}
              className={css.img}
            />
            <p>{member.name}</p>
            <p>{member.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

