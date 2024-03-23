This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Flick Fetcher DB Documentation

## Introduction
This site is powered by the TMDb API. Discover trending movies and exploring detailed information about your favorite films.
Responsive design for desktop and mobile users.

## Installation and Setup
Getting started with our Movie Website:
1. Clone the repository from our GitHub page.
2. Install the necessary dependencies by running `npm install`.
3. Obtain an API key from TMDb and replace the placeholder in `api/api.jsx` with your own key.

 ## Setting Up Your TMDB API Key

To get started with our site, you'll need to set up your API key. Follow these simple steps:

1. **Locate the .env.template File**: In the root directory of the project, you'll find a file named `.env.template`.

2. **Copy and Rename**: Make a copy of `.env.template` and rename it to `.env.local`.

3. **Replace the Placeholder**: Open `.env.local` and replace `YOUR_API_KEY` with your actual API key.

Here's an example of how your `.env.local` file should look:

```plaintext
NEXT_PUBLIC_API_KEY=YOUR_ACTUAL_API_KEY_HERE

```

If you need more documentation, please visit [TMDB website](https://developer.themoviedb.org/docs/getting-started)

## Usage
Here's how you can make the most out of my Movie Website:
- **Home Page**: Browse trending movies and search for specific titles by using the search form.
- **Detail Page**: Dive deep into the details of any movie by clicking on its card. You'll find everything from release dates to top cast members!

## Technologies Used
I've crafted this Movie Website using the following technologies:
- Next.js
- Tailwind CSS
- React
- TMDb API

## Key Functions

### `getSearchedMovie`
Fetches movies based on search criteria like title and release date:
```javascript
 export async function getSearchedMovie(title, releaseYear){
    try{
        const respone = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&primary_release_year=${releaseYear}&page=1`, options)
        const searchData = await respone.json();
        return searchData.results
    }catch(error){
        console.error('Error getting movie search result: ', error)
    }
  }
```
Then in the page.jsx you have
## `fetchSearchedMovies`

this function append search data to the URL param.
This lets you access movie details with dýnamic router but keeps the search result if you go back 
to check out another movie from the search result.

```javascript
  async function fetchSearchedMovies(title, releaseDate) {
    try {
      const searchedMovie = await getSearchedMovie(title, releaseDate);
      setSearchedMovies(searchedMovie);
      console.log("Search Results: ", searchedMovie);

      // Constructing query parameters
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("movieTitle", title);
      if (releaseDate) queryParams.append("releaseDate", releaseDate);

      // Updating the URL
      router.push(`?${queryParams.toString()}`);
      setLoading(false);
    } catch (error) {
      console.error("Error searching movie on page: ", error);
    }
  }
  ```

  ...this is how useEffect look to see if there is any data stored in the url from prev search:

  ```javascript
    useEffect(() => {
    // Grab query parameter if user search movie before
    const movieTitle = searchParams.get("movieTitle");
    const releaseDate = searchParams.get("releaseDate");
    if (movieTitle) {
      fetchSearchedMovies(movieTitle, releaseDate);
    }

    fetchMovieList(1);
  }, []);
  ```


### `getMovieDetails`
This function grabs all the juicy details about a specific movie using its ID:

```javascript
async function getMovieDetails(movie_id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options);
    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.error('Error fetch movie details: ', error);
  }
}
```
### `getCreditsList`
Fetch info regardning crew members:
```javascript
async function getCreditsList(movie_id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`, options);
    const creditsList = await response.json();
    return creditsList.cast;
  } catch (error) {
    console.error('Oops! Couldn't fetch credits list: ', error);
  }
}
```

## Example Usage

```javascript
// Fetch movie details by ID
const movieDetails = await getMovieDetails(movieId);
console.log(movieDetails);

// Fetch top cast members for a movie
const creditsList = await getCreditsList(movieId);
console.log(creditsList);
```

