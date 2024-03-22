"use client"
export default function Paigination({searchedMoviePage, onClick}){


const loopPages = () => {
    let pagesArray = []
    for (let i = 0; i < searchedMoviePage; i++){
        pagesArray.push(i)
    } 
    return pagesArray
}
const moviePages = loopPages();
   
    return (        
    <nav aria-label="Page navigation">
      <ul className="inline-flex -space-x-px text-sm">
      {moviePages.map((page)=>(
        <li key={page} onClick={onClick}>
        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</a>
      </li>
      ))}
        
      
      </ul>
    </nav>

    )
}