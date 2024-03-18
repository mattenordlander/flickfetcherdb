"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMovieList, getSearchedMovie } from "./api/api";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import MovieSearchForm from "./components/MovieSearchForm"

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
    <main  className="m-auto container px-4 mb-10">
        
             <MovieSearchForm
             
             yearLabel={"Year"}
             inputLabel={"What are you looking for?"}
             handleChange={handleChange}
             value={searchMovieValue.releaseDate}
             titleValue={searchMovieValue.movieTitle}
             yearsArray={yearsArray}
             disabled={searchMovieValue.movieTitle.length <= 1}
             disabledBtn={searchMovieValue.movieTitle.length <= 1}
             onClick={() => {
              setLoading(true)
              fetchSearchedMovies(
                searchMovieValue.movieTitle,
                searchMovieValue.releaseDate
              );
            }}
             />

      <h1 className="text-5xl my-8 comic-book-title">TRENDNING MOVIES</h1>
      {movieList.length === 0 && <><h1>Your search - did not match any movies</h1></>}
<section className="container gap-7 grid justify-center max-w grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
  
        {movieList.map(({ title, id, poster_path }) => (
  <Link key={id} href={`/${id}`} className="flex bg-white border-4 border-black">
            <div className="max-w-sm overflow-hidden flex flex-col" style={{boxShadow:"8px 7px 0px 3px #1b1d21"}}>
            <img className="w-full" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Sunset in the mountains"/>
            <div className="px-3 py-4 flex-grow">
              <div className="truncate text-lg font-bold mb-2 text-stone-950">{title}</div>
            </div>
                  </div>
                  </Link>
        ))}
</section>
    </main>
  );
}
