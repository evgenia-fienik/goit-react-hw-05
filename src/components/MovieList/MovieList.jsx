import { Link } from "react-router-dom";
import React from "react";
import css from './MovieList.module.css'

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return;
  }

  return (
    <ul className={css.ul}>
      {movies.map(movie => (
        <li  className={css.li} key={movie.id}>
          <Link className={css.a}to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
}