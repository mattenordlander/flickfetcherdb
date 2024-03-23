const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTBiZmE3ZmJiNmZlMWI0MWY4NTkzYzVkMjMzMGI4OSIsInN1YiI6IjY0ODgxMmEzZTM3NWMwMDExYzgxNGVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7M-hpGKynn0cM5--vOUNKfXp7VrWe7dyLpdzOjbXDy0`
    }
  };

export async function getMovieList(page) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options
      );
      const data = await response.json()
      console.log(data.results)
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
        console.log(searchData)
        return searchData
        
    }catch(error){
        console.error('Error getting movie search result: ', error)
    }
  }

  export async function getMovieDetails(movie_id){
    try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options);
      const movieDetails = await response.json();
       console.log(movieDetails)
       return movieDetails;
  
    }catch(error){
      console.error('Error fetching Movie Details: ', error)
    }
  }

  export async function getCreditsList(movie_id){
    try{
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`, options)
      const creditsList = await response.json();
      console.log(creditsList);
      return creditsList.cast;
    } catch(error){
      console.error('Get credits list error : ',error);
    }
  
  }