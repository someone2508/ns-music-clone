import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as HeadPhoneIcon } from "../assets/headphone.svg";
import { ReactComponent as PodCastIcon } from "../assets/podcast.svg";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <ul className="nav-links">
        <li className="nav-item">
          <HomeIcon />
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <PodCastIcon />
          <NavLink to="/social">Social</NavLink>
        </li>
        <li className="nav-item">
          <HeadPhoneIcon />
          <NavLink to="/library">Library</NavLink>
        </li>
      </ul>
      <SearchBar />
      <Profile />
    </nav>
  );
}
