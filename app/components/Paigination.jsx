"use client"
export default function Paigination({searchedMoviePage, fetchSearchedMovies, movieTitle,releaseDate}){


const loopPages = () => {
    let pagesArray = []
    for (let i = 0; i < searchedMoviePage; i++){
        pagesArray.push(i + 1)
    } 
    return pagesArray
}
const moviePages = loopPages();

   if (moviePages.length <= 1) return
    return (        
    <nav className="flex justify-center" aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-xl">
      {moviePages.map((page)=>(
        <li key={page} onClick={()=> {fetchSearchedMovies(movieTitle,releaseDate,page)}} className="flex px-4 items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        {page}
      </li>
      ))}
        
      
      </ul>
    </nav>

    )
}