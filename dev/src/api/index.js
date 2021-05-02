import axios from 'axios';

export const apiKey = 'd212dc1bfc2d8009f736f68f2e71938f';
export const url = 'https://api.themoviedb.org/3';
export const search = `${url}/search/movie?&`;
export const byYear = `${url}/discover/movie`;
export const nowPlaying = '';
export const movieUrl = `${url}/movie`;
export const moviesUrl = '';
export const personUrl = '';
export const genreUrl = '';

export const featureMov =
    `${url}/discover/movie?sort_by=popularity.desc&api_key=d212dc1bfc2d8009f736f68f2e71938f&page=1`;
export const IMGPATH = "https://image.tmdb.org/t/p/w1280";
export const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=d212dc1bfc2d8009f736f68f2e71938f&query=";


export const fetchMovieByYear = async (valYear) => {
    try {
        const { data } = await axios.get(byYear, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                year: valYear,
            }
        });
        return data.results;
    } catch (error) { }
}

export const fetchMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        return data;
    } catch (error) { }
}