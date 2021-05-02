import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { featureMov, SEARCHAPI, fetchMovieByYear } from '../api/index';
import DatePicker from 'react-datepicker';
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { Card } from 'antd';

const Movie = lazy(() => import('../components/Movie'));

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ moviesMatch, setMoviesMatch ] = useState([]);
  const wrapperRef = useRef(null);
  const [display, setDisplay] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ yearTerm, setYearTerm] = useState(new Date());

  useEffect(() => {
    fetch(featureMov)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
  }, [])

  const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
          setDisplay(false);
        }
      };

      useEffect(() => {
            window.addEventListener("mousedown", handleClickOutside);
            return () => {
              window.removeEventListener("mousedown", handleClickOutside);
            };
          });

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

  const searchMovies = (val) => {
    let matches = movies.filter((mov) => {
      const regex = new RegExp(`${val}`, "gi");
      return mov.title.match(regex) || mov.original_title.match(regex);
    })
    setMoviesMatch(matches);
  };

  return (
    <div className="container" style={{ maxWidth: '100%' }}>
       <header style={{ psotition: 'absolute' }}>
         <ul className="list-inline">
           <li className="list-inline-item ml-2">
           <div ref={wrapperRef} className="flex-container flex-column pos-rel">
              <input
                className="search"
                type="text"
                placeholder="search..."
                onClick={() => setDisplay(!display)}
                // value={searchTerm}
                // onChange={handleSearch}
                onChange={(e) => searchMovies(e.target.value)}
              />
            </div>
           </li>
           <li className="list-inline-item">
            <DatePicker
              selected={yearTerm}
              onChange={date => onChangeYear(date)}
              // onChange={onChangeYear}
              showYearPicker
              dateFormat="yyyy"
              yearItemNumber={9}
              className="search"
            />
           </li>
         </ul>
      </header>
      { moviesMatch && display && moviesMatch.map((x, i) => (
                <div className="wrapCard">
                    <Card style={{ width: '50%', position: 'absolute' }} title={`Film: ${x.title}`} >
                      {x.title}
                    </Card>
                </div>
              ))}
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
