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
    const {id,title} = movieDetails;

    return (
        <div>
            <h1>detail page</h1>
            <p>{title}</p>
            <p>{id}</p>
        </div>
    )
}