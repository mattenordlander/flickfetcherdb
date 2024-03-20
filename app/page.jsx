"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMovieList, getSearchedMovie } from "./api/api";
import Link from "next/link";
import MovieSearchForm from "./components/MovieSearchForm";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TwCard from "./components/TwCard";

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMovieValue, setSearchMovieValue] = useState({
    movieTitle: "",
    releaseDate: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

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
    // Grab query parameter if user search movie before
    const movieTitle = searchParams.get("movieTitle");
    const releaseDate = searchParams.get("releaseDate");
    if (movieTitle) {
      fetchSearchedMovies(movieTitle, releaseDate);
    }

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
      setSearchedMovies(searchedMovie);
      console.log("Search Results: ", searchedMovie);

      // Constructing query parameters
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("movieTitle", title);
      if (releaseDate) queryParams.append("releaseDate", releaseDate);

      // Updating the URL
      router.push(`?${queryParams.toString()}`);
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
    <main className="m-auto container px-4 mb-10">
      <MovieSearchForm
        yearLabel={"Year"}
        inputLabel={"What are you looking for?"}
        handleChange={handleChange}
        value={searchMovieValue.releaseDate}
        titleValue={searchMovieValue.movieTitle}
        yearsArray={yearsArray}
        disabled={searchMovieValue.movieTitle.length <= 1}
        onClick={() => {
          setLoading(true);
          fetchSearchedMovies(
            searchMovieValue.movieTitle,
            searchMovieValue.releaseDate
          );
        }}
      />
      <h1 className="top-0 text-5xl my-8 comic-book-title">Search results</h1>
      <section className="relative container gap-7 grid justify-center max-w grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-24">
        {searchedMovies && searchedMovies.length === 0 && (
          <>
            <h1>Your search - did not match any movies</h1>
          </>
        )}
        {searchedMovies.map(({ title, id, poster_path }) => {
          if (!poster_path) return;
          return (
            <Link key={id} href={`/${id}`} className="flex">
              <TwCard title={title} image={poster_path} />
            </Link>
          );
        })}
      </section>

      <h1 className="text-5xl my-8 comic-book-title">TRENDNING MOVIES</h1>
      <section className="container gap-7 grid justify-center max-w grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {movieList.map(({ title, id, poster_path }) => (
          <Link key={id} href={`/${id}`} className="flex">
            <TwCard title={title} image={poster_path} />
          </Link>
        ))}
      </section>
    </main>
  );
}
