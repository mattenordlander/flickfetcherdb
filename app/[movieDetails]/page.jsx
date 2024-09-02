import { movieAPI } from "../api/tmdbAPI";
import { Montserrat } from "next/font/google";
import TwCard from "../components/TwCard";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300","500"] });

async function fetchMovieDetails(params) {
  const movieDetails = await movieAPI.getMovieDetails(params.movieDetails);

  if (!movieDetails || movieDetails.error) {
    return { error: "Movie not found" };
  }

  return movieDetails;
}

export default async function movieDetailPage({ params }) {
  const movieDetails = await fetchMovieDetails(params);

  const convertToHoursAndMinutes = (totalMinutes) => {
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hour < 1) {
      return `${minutes}min`;
    } else if (hour >= 1 && minutes < 1) {
      return `${hour}h`;
    } else return `${hour}h ${minutes}min`;
  };

  // Destruct movieInfo
  const {
    id,
    title,
    backdrop_path,
    poster_path,
    release_date,
    genres,
    runtime,
    tagline,
    overview

  } = movieDetails;

  const creditsList = await movieAPI.getCreditsList(id);
  

  return (
    <div className="container m-auto">
      <section
        className="relative before:content-[''] before:bg-slate-800 before:bg-opacity-50 before:absolute before:backdrop-blur-sm before:inset-0 w-100 p-4 bg-no-repeat bg-cover bg-top"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="relative flex flex-col md:flex-row justify-center items-center md:items-start gap-8">
          <img
            className="w-36 md:w-52 lg:w-1/5 object-contain"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`${title}`}
          />
          <div className="">
            <h1 className="comic-book-sub-title text-2xl md:text-4xl">{`${title} (${
              release_date.split("-")[0]
            })`}</h1>
            <ul style={montserrat.style} className=" text-xs flex md:text-lg items-start mb-8">
              {genres.map((genreType, index) => {
                return (
                  <li key={genreType.name}>
                    <p>
                      {genreType.name}
                      {/* Remove the comma for the last index */}
                      {index !== genres.length - 1 && ","}
                    </p>
                  </li>
                );
              })}
              <li><span className="mx-2">&#8226;</span></li>
              <li>{convertToHoursAndMinutes(runtime)}</li>
            </ul>
            <div style={montserrat.style}>
                <p className="italic text-sm text-gray-300 font-light">{tagline}</p>
                <h2 className="my-2 ">Overview</h2>
                <p className="font-light text-sm">{overview}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-4"> 
        <h3 className="comic-book-sub-title text-4xl">Top Cast</h3>
      </section>
      <section className="container gap-7 grid justify-center max-w grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-24 px-4">
        {creditsList.map(({profile_path, name, character}, index)=>{
          if(index > 5 || !profile_path) return
          return(
            <TwCard
            image={profile_path}
            title={name}
            extra={`(${character})`}
            fontForExtra={montserrat.style}
            />
          )
        })}
      </section>
    </div>
  );
}
