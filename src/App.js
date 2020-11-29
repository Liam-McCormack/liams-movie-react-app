import React, { useEffect, useState } from 'react';

import Movie from './components/Movies'


// console.log(process.env.REACT_APP_API_KEY) 

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}&page=1`

// const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_API_KEY}&query=`


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect = () => {
  //   fetch(FEATURED_API).then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       setMovies(data)
  //     })
  // }

  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

  const getMovies = API => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results)
      });
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm); 
      setSearchTerm('');
    }

    
  }

  const handleOnChange = (event) => {
    //Set the searchTerm in the state
    setSearchTerm(event.target.value);

  }
 
  return ( 
    // React fragment - needed the divs below to be children of 'root' div for Search bar
    //Could use empty <div> too
    <>  
      <header>
          <form onSubmit={handleSubmit}>
            <input className='search' type='search' 
            placeholder='Search...' value ={searchTerm}
            onChange={handleOnChange}>

            </input>
          </form>
      </header>
      <div className='movie-container'>
      
        {movies.length > 0 && movies.map((movie) => (
          <Movie key={movie.id} {...movie}/>
        ))}
      </div>
    </>
  )
 
}

export default App;
