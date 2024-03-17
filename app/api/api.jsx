const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTBiZmE3ZmJiNmZlMWI0MWY4NTkzYzVkMjMzMGI4OSIsInN1YiI6IjY0ODgxMmEzZTM3NWMwMDExYzgxNGVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7M-hpGKynn0cM5--vOUNKfXp7VrWe7dyLpdzOjbXDy0`
    //   Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHORIZATION}`
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

  export async function getSearchedMovie(title){
    try{
        const respone = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&&page=1`, options)

        const searchData = await respone.json();
        console.log("Searching... ",searchData.results);
        return searchData.results
        
    }catch(error){
        console.error('Error getting movie search result: ', error)
    }
  }