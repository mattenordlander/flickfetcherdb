import {getMovieDetails} from "../api/api"

async function fetchMovieDetails(params){
    const movieDetails = await getMovieDetails(params.movieDetails);

    if(!movieDetails || movieDetails.error){
        return {error: "Movie not found"}
    }

    return movieDetails;
}

export default async function movieDetailPage({params}){

    const movieDetails = await fetchMovieDetails(params);


    // Destruct movieInfo
    const {id,title, backdrop_path, poster_path, release_date} = movieDetails;

    return (
        <div className="container m-auto">
            <section className="relative before:content-[''] before:bg-slate-800 before:bg-opacity-20 before:absolute before:backdrop-blur-sm before:inset-0 w-100 p-4 bg-no-repeat bg-cover bg-center" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${backdrop_path})`}}>
                <div className="relative flex gap-8 text-2xl comic-book-sub-title"> 
                <img className="w-36 md:w-52 lg:w-1/5" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`${title}`} />
                <div>
                    <h1 className="">{`${title} (${release_date.split("-")[0]})`}</h1>
                </div>
                </div>
                
            </section>
            <div className=""></div>
            <h1>detail page</h1>
            <p>{title}</p>
            <p>{id}</p>
        </div>
    )
}