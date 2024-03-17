"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {getMovieList, getSearchedMovie} from "./api/api"
import Link from "next/link"
import { useDebounce } from 'use-debounce';

export default function Home() {
  const [movieList,setMovieList] = useState([])
  const [searchMovie, setSearchMovie] = useState("")
  const [loading,setLoading] = useState(true)
  const [value] = useDebounce(searchMovie, 1500)

  async function fetchMovieList(page){
    try{
      const tmdbMovieList = await getMovieList(page)
      setMovieList(tmdbMovieList);
      setLoading(false);
    }catch(error){
      console.error("error fetching movie List to page: ", error);
    }
    
   }
  useEffect(() => {
    fetchMovieList(1);
    
  }, []);


  async function fetchSearchedMovie(title){
    try{
      const searchedMovie = await getSearchedMovie(title);
      setMovieList(searchedMovie);
      console.log(searchedMovie);
      setLoading(false);
    }catch(error){
      console.error("Error searching movie on page: " , error)
    }
  }

  useEffect(() => {
    if(searchMovie){
      setLoading(true)
      fetchSearchedMovie(value);
    }
  }, [value]);


  const handleChange = (e) =>{
    setSearchMovie(e.target.value)
   console.log(value)
  }


  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  return (
    <main>
      <label htmlFor="Search">Search</label>
      <input type="text" onChange={handleChange} />
      <h1>TRENDNING MOVIES</h1>
      { movieList.map(({title, id})=>(
         <div key={id}>
        <Link href={""}>
            <p style={{color:"red", backgroundColor:"black", padding:".5rem", margin:".3rem 0"}}>{title}</p>
        </Link>
        </div>
      ))}
    </main>
  );
}
