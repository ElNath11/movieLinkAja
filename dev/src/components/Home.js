import React, { useEffect, useState, useRef, Component, lazy, Suspense } from 'react';
// import Movie from '../components/Movie';
import { featureMov, SEARCHAPI, fetchMovieByYear } from '../api/index';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

const Movie = lazy(() => import('../components/Movie'));

const Auto = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const movies = [];
    const promises = new Array(10)
      .fill()
      .map((v, i) => fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d212dc1bfc2d8009f736f68f2e71938f&page=1${i + 1}`));
    Promise.all(promises).then(moviesArr => {
      debugger;
      return moviesArr.map(value =>
        value
          .json()
          .then(({ data }) =>
            movies.push({ data })
          )
      );
    });
    debugger;
    setOptions(movies);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updateMovies = poke => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter(({ title }) => title.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updateMovies(value.title)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ yearTerm, setYearTerm] = useState(new Date());

  useEffect(() => {
    fetch(featureMov)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
  }, [])

  const handleSearch = async (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val) {
      fetch(SEARCHAPI + val)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
    } else {
      fetch(featureMov)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        })
    }
  }

  const onChangeYear = async (e) => {
    const val = moment(e).format('YYYY');
    const valDate = e;
    setYearTerm(valDate);
    if (val) {
      const fetchAPI = async () => {
        setMovies(await fetchMovieByYear(Number(val)));
      };
      fetchAPI();
    } else {
      fetch(featureMov)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        })
    }

  }

  return (
    <div className="container" style={{ maxWidth: '100%' }}>
       <header>
         <ul className="list-inline">
           <li className="list-inline-item ml-2">
            <input
              className="search"
              type="text"
              placeholder="search..."
              value={searchTerm}
              onChange={handleSearch}
            />
           </li>
           <li className="list-inline-item">
            <DatePicker
              selected={yearTerm}
              onChange={date => onChangeYear(date)}
              // onChange={onChangeYear}
              showYearPicker
              dateFormat="yyyy"
              yearItemNumber={9}
            />
           </li>
           {/* <li className="list-inline-item">
             <Auto />
           </li> */}
         </ul>
      </header>
      <div className="movie-container">
      <Suspense fallback={<div>Loading</div>}>
      {movies.length > 0 && movies.map((mov) => 
         <Movie
          key={mov.id}
          data={mov} 
        />
      )}
      </Suspense>
       </div>
    </div>
  );
}

export default App;
