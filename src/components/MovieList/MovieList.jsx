import { Link, useLocation } from "react-router-dom";
import css from './MovieList.module.css'

export default function MovieList({ movies }) {
  const location = useLocation();

   if (!Array.isArray(movies) || movies.length === 0) {
    return ; 
  }

  return (
    <ul className={css.ul}>
      {movies.map(({id, title}) => {
        return(
     <li  className={css.li} key={id}>
        <Link className={css.a} to={`/movies/${id}`} state={{from: location}}>{title}</Link>
        </li>
        );
      })}
    </ul>
  );
}