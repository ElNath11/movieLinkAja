import React from 'react';
import { IMGPATH } from '../api/index';
import { Link } from "react-router-dom";

const Movie = ({ data }) => (
    <div className="movie">
    <Link to={`/movie/${data.id}`}>   
    <div>
        <img src={IMGPATH + data.poster_path} alt={data.title} />
        <div className="movie-footer">
            <h3>{data.title}</h3>
            <span>{data.vote_average}</span>
        </div>
        <div className="movie-overview">
            <h2>Overview: </h2>
            <p>{data.overview}</p>
        </div>
        </div>
    </Link>
    </div>
);

export default Movie;