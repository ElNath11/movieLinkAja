import React, { useEffect, useState } from 'react';
import { fetchMovieDetail } from '../api/index';
import { Link } from "react-router-dom";

export function MovieDetail({match}) {
    let params = match.params;
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
        };

        fetchAPI();
    }, [params.id]);
    return(
        <div className="container">
            <header>
            <Link to='/'>
                <button type="button" className="btn btn-outline-info">
                    Home
                </button>
            </Link>
            </header>
            <div className="row mt-2">
                <div className="col text-center" style={{ width: '100%' }}>
                    <img
                        className="img-fluid"
                        src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                        alt={detail.title}
                    />
                </div>                
            </div>
            {/* Rate */}
            <div className="row mt-3">
                 {/* Title */}
                 <div className="col-12"
                    style={{ textAlign: 'center', fontSize: 35 }}
                    >
                    {detail.title}
                </div>
                {/* Title */}
                <div className="col-12">
                    <div className="mt-3">
                        <p style={{ color: "#f4f4f4", fontWeight: "bolder" }}>OVERVIEW</p>
                        {detail.overview}
                    </div>
                </div>
            </div>
            {/* Rate */}

            {/* // Overview */}
            <div className="row mt-3">
                <div className="col-md-3">
                <p style={{ color: "#f4f4f4", fontWeight: "bolder" }}>RELEASE DATE</p>
                <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
                </div>
                <div className="col-md-3">
                <p style={{ color: "#f4f4f4", fontWeight: "bolder" }}>RUN TIME</p>
                <p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
                </div>
                <div className="col-md-3">
                <p style={{ color: "#f4f4f4", fontWeight: "bolder" }}>BUDGET</p>
                <p style={{ color: "#f4c10f" }}>{detail.budget}</p>
                </div>
                <div className="col-md-3">
                <p style={{ color: "#f4f4f4", fontWeight: "bolder" }}>HOMEPAGE</p>
                <a href={detail.homepage} target='_blank' rel="noopener noreferrer">
                    <p style={{ color: "#f4c10f" }}>{detail.homepage}</p>
                </a>
                </div>
            </div>
            {/* // Overview */}
        </div>
    )
}

export default MovieDetail;