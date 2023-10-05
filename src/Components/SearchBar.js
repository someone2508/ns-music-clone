import { ReactComponent as SearchIcon } from "../assets/search.svg";

export default function SearchBar() {
  return (
    <section className="searchbar-container">
      <input type="text" name="search" id="search" placeholder="Search Here" />
      <SearchIcon />
    </section>
  );
}
