"use server";

import data from "./data.json";

export async function getMovies() {
    return data.movies.map(normalizeImdbMovie)
}
function normalizeImdbMovie(movie) {
    return {
        title: movie.title || movie.Title,
        year: movie.year || movie.Year,
        rated: movie.rated || movie.Rated,
        released: movie.released || movie.Released,
        runtime: movie.runtime || movie.Runtime,
        genre: movie.genre || movie.Genre,
        director: movie.director || movie.Director,
        writer: movie.writer || movie.Writer,
        actors: movie.actors || movie.Actors,
        plot: movie.plot || movie.Plot,
        language: movie.language || movie.Language,
        country: movie.country || movie.Country,
        awards: movie.awards || movie.Awards,
        poster: movie.poster ?? movie.Poster ?? (movie.images && movie.images[0]),
        metascore: movie.metascore || movie.Metascore,
        imdbRating: movie.imdbRating || movie.imdbRating,
        imdbVotes: movie.imdbVotes || movie.imdbVotes,
        imdbID: movie.imdbID || movie.imdbID,
        type: movie.type || movie.Type,
        response: movie.response || movie.Response,
        images: movie.images || movie.Images,
        rtRating: movie.rtRating || movie.rtRating
    };
}