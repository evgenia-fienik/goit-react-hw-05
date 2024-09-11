import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../services/api'
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();  
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
          params: {
            api_key: API_KEY,
          },
        });
        setReviews(response.data.results);
      } catch (error) {
        setError("Failed to fetch movie reviews.");
      }
    };

   if (movieId) fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews || reviews.length === 0) {
  return <p>We don't have any reviews for this movie.</p>;
}

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul  className={css.ul}>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

