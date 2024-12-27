"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../server/movies";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites().then(favorites => setFavorites(favorites));
    }, []);

    const toggleFavorite = (movie) => {
        if (favorites.some(fav => fav.title === movie.title)) {
            removeFavorite(movie.title).then(() => {
                setFavorites(prevFavorites => prevFavorites.filter(fav => fav.title !== movie.title));
            });
        } else {
            addFavorite(movie).then(() => {
                setFavorites(prevFavorites => [...prevFavorites, movie]);
            });
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}