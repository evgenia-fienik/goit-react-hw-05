import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import css from './Navigation.module.css'; 

export default function Navigation() {
  
  const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
  return (
    <nav className={css.nav}>
      <ul className={css.ul}>
        <li>
          <NavLink
            to="/"className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={buildLinkClass}
        
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}