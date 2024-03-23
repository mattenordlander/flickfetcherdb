const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KE}`
    }
  };

export async function getMovieList(page) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options
      );
      const data = await response.json()
      return data.results
    } catch (error) {
      console.error("Error getting movie list: ", error);
    }
  }

  export async function getSearchedMovie(title, releaseYear, page){
    try{
      if(!releaseYear){
        releaseYear = "";
      }
        const respone = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&primary_release_year=${releaseYear}&page=${page}`, options)
        const searchData = await respone.json();
        return searchData
        
    }catch(error){
        console.error('Error getting movie search result: ', error)
    }
  }

  export async function getMovieDetails(movie_id){
    try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options);
      const movieDetails = await response.json();
       return movieDetails;
  
    }catch(error){
      console.error('Error fetching Movie Details: ', error)
    }
  }

  export async function getCreditsList(movie_id){
    try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`, options)
      const creditsList = await response.json();
      return creditsList.cast;
    } catch(error){
      console.error('Get credits list error : ',error);
    }
  
  }