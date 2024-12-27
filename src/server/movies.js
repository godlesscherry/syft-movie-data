"use server";

import { getMovies as getImdb } from "./providers/imdb";
import { getMovies as getRT } from "./providers/rt";

let favorites = [];

export async function getRecentMovies() {
    const movies = [...await getImdb(), ...await getRT()];
    return movies.slice(0, 5);
}

export async function getGenereAndMovies() {
    const movies = [...await getImdb(), ...await getRT()];
    const genres = movies.reduce((acc, movie) => {
        const genreField = movie.genre || movie.Genre;
        const genres = genreField?.split(",").map((genre) => genre.trim());
        genres?.forEach((genre) => {
            if (!acc[genre]) {
                acc[genre] = [];
            }
            acc[genre].push(movie);
        });
        return acc;
    }, {});

    const sortedGenres = Object.keys(genres).sort().reduce((acc, genre) => {
        acc[genre] = genres[genre];
        return acc;
    }, {});
        
    return Object.entries(sortedGenres).map(([genre, movies]) => ({title: genre, movies}));
}

export async function addFavorite(movie) {
    if (!favorites.some(fav => fav.title === movie.title)) {
        favorites.push(movie);
    }
}

export async function removeFavorite(movie) {
    favorites = favorites.filter(fav => fav.title !== movie.title);
}

export async function getFavorites() {
    return favorites;
}