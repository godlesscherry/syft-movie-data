"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../server/movies";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch favorites from server and update state
        getFavorites().then(fetchedFavorites => {
            console.log('Fetched favorites from server:', fetchedFavorites);
            setFavorites(fetchedFavorites);
        });
    }, []);

    const toggleFavorite = (movie) => {
        if (favorites.some(fav => fav.title === movie.title)) {
            removeFavorite(movie).then(() => {
                setFavorites(prevFavorites => {
                    const updatedFavorites = prevFavorites.filter(fav => fav.title !== movie.title);
                    console.log('Removed favorite:', movie.title, 'Updated favorites:', updatedFavorites);
                    return updatedFavorites;
                });
            });
        } else {
            addFavorite(movie).then(() => {
                setFavorites(prevFavorites => {
                    const updatedFavorites = [...prevFavorites, movie];
                    console.log('Added favorite:', movie.title, 'Updated favorites:', updatedFavorites);
                    return updatedFavorites;
                });
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