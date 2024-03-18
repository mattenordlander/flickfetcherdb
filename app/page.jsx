"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMovieList, getSearchedMovie } from "./api/api";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import SelectElement from "./components/SelectElement"

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMovieValue, setSearchMovieValue] = useState({
    movieTitle: "",
    releaseDate: "",
  });

  async function fetchMovieList(page) {
    try {
      const tmdbMovieList = await getMovieList(page);
      setMovieList(tmdbMovieList);
      setLoading(false);
    } catch (error) {
      console.error("error fetching movie List to page: ", error);
    }
  }
  useEffect(() => {
    fetchMovieList(1);
  }, []);

  const getYearsArray = () => {
    const CurrentYear = new Date().getFullYear();
    const years = [];

    for (let year = 1930; year <= CurrentYear; year++) {
      years.push(year);
    }
    const yearsReversed = years.reverse();
    return yearsReversed;
  };

  const yearsArray = getYearsArray();

  async function fetchSearchedMovies(title, releaseDate) {
    try {
      const searchedMovie = await getSearchedMovie(title, releaseDate);
      setMovieList(searchedMovie);
      console.log(searchedMovie);
      setLoading(false);
    } catch (error) {
      console.error("Error searching movie on page: ", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchMovieValue({ ...searchMovieValue, [name]: value });
  };

  if (loading || !movieList) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <label htmlFor="Search">Title...</label>
      <input
        type="text"
        onChange={handleChange}
        value={searchMovieValue.movieTitle}
        name={"movieTitle"}
      />
     <SelectElement
     label={"Year"}
     handleChange={handleChange}
     value={searchMovieValue.releaseDate}
     yearsArray={yearsArray}
     disabled={searchMovieValue.movieTitle.length <= 1}
     />
      <button
        style={{
          border: "1px solid black",
          padding: ".1rem .7rem",
          marginLeft: "1rem",
        }}
        onClick={() => {
          setLoading(true)
          fetchSearchedMovies(
            searchMovieValue.movieTitle,
            searchMovieValue.releaseDate
          );
        }}
        disabled={searchMovieValue.movieTitle.length <= 1}
      >
        Search
      </button>
      <h1>TRENDNING MOVIES</h1>
      {movieList.length === 0 && <><h1>Your search - did not match any movies</h1></>}

      {movieList.map(({ title, id }) => (
        <div key={id}>
          <Link href={""}>
            <p
              style={{
                color: "red",
                backgroundColor: "black",
                padding: ".5rem",
                margin: ".3rem 0",
              }}
            >
              {title}
            </p>
          </Link>
        </div>
      ))}
    </main>
  );
}
