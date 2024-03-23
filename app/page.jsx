"use client";
import { useEffect, useState } from "react";
import { getMovieList, getSearchedMovie } from "./api/api";
import Link from "next/link";
import MovieSearchForm from "./components/MovieSearchForm";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TwCard from "./components/TwCard";
import Paigination from "./components/Paigination";

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedMoviePage, setSearchedMoviePage] = useState();
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

      // Grab query parameter if user search movie before
      const movieTitle = searchParams.get("movieTitle");
      const releaseDate = searchParams.get("releaseDate");
      const page = searchParams.get("Page");
  useEffect(() => {

    if (movieTitle) {
      fetchSearchedMovies(movieTitle, releaseDate, page);
    }

    fetchMovieList(1);
  }, []);

  useEffect(() =>{

    if(!movieTitle) return
    fetchSearchedMovies(movieTitle, releaseDate, page);
    setSearchMovieValue({
      movieTitle:movieTitle ? movieTitle : "",
      releaseDate:releaseDate ? releaseDate : ""})
  },[movieTitle, releaseDate ,page])

  const getYearsArray = () => {
    const CurrentYear = new Date().getFullYear();
    const years = [];
// loop year from 1930 to current year
    for (let year = 1930; year <= CurrentYear; year++) {
      years.push(year);
    }
    const yearsReversed = years.reverse();
    return yearsReversed;
  };

  const yearsArray = getYearsArray();

  async function fetchSearchedMovies(title, releaseDate, page) {
    try {
      const searchedMovie = await getSearchedMovie(title, releaseDate, page);
      setSearchedMovies(searchedMovie.results);

      // get vale of x amout of pages 
  setSearchedMoviePage(searchedMovie.total_pages);

      // Constructing query parameters
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("movieTitle", title);
      if (releaseDate) queryParams.append("releaseDate", releaseDate);
      if (page) queryParams.append("Page", page);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="m-auto container px-4 mb-10">
      <MovieSearchForm
        yearLabel={"Year"}
        inputLabel={"Title"}
        handleChange={handleChange}
        value={searchMovieValue.releaseDate}
        titleValue={searchMovieValue.movieTitle}
        yearsArray={yearsArray}
        disabled={searchMovieValue.movieTitle.length <= 1}
        onClick={() => {
          setLoading(true);
          fetchSearchedMovies(
            searchMovieValue.movieTitle,
            searchMovieValue.releaseDate,
            1
          );
        }}
      />
   {searchedMovies.length > 0 && (
  <h1 className="text-5xl my-8 comic-book-title">Search results</h1>
)}
 {movieTitle && searchedMovies.length === 0 && (
    <>
      <h1 className="text-center mt-10 comic-book-sub-title text-2xl">oops! Your search - {movieTitle} - did not match any movies</h1>
    </>
  )}
<section className="relative container gap-7 grid justify-center max-w grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-24">
  {searchedMovies.map(({ title, id, poster_path }) => {
    if (!poster_path) return;
    return (
      <Link key={id} href={`/${id}`} className="flex">
        <TwCard title={title} image={poster_path} />
      </Link>
    );
  })}
  
</section>
<Paigination searchedMoviePage={searchedMoviePage} movieTitle={movieTitle} releaseDate={releaseDate} fetchSearchedMovies={fetchSearchedMovies}/>

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
