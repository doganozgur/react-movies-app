import React, { useState, useEffect } from 'react';
import './App.css';
import Movie from './components/Movie';

const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

function App() {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(APIURL);
      const movieRes = await res.json();
      setMovie(movieRes.results);
    }
    fetchData();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    async function fetchData() {
      const res = await fetch(SEARCHAPI + search);
      const movieRes = await res.json();
      setMovie(movieRes.results);

      setSearch('');
    }
    fetchData();
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            value={search}
            onChange={handleOnChange}
            className="search"
            type="search"
            placeholder="Search..."
          />
        </form>
      </header>
      <div className="movie-container">
        {movie.map((mov) => (
          <Movie key={mov.id} {...mov} />
        ))}
      </div>
    </>
  );
}

export default App;
