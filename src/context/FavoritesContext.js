"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../server/movies";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        // Load favorites from localStorage if available
        const savedFavorites = localStorage.getItem('favorites');
        console.log('Loaded favorites from localStorage:', savedFavorites);
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        // Fetch favorites from server and update state
        getFavorites().then(fetchedFavorites => {
            console.log('Fetched favorites from server:', fetchedFavorites);
            setFavorites(prevFavorites => {
                const combinedFavorites = [...fetchedFavorites, ...prevFavorites];
                const uniqueFavorites = combinedFavorites.filter((movie, index, self) =>
                    index === self.findIndex((m) => m.title === movie.title)
                );
                console.log('Unique favorites:', uniqueFavorites);
                localStorage.setItem('favorites', JSON.stringify(uniqueFavorites));
                return uniqueFavorites;
            });
        });
    }, []);

    useEffect(() => {
        // Save favorites to localStorage whenever they change
        console.log('Saving favorites to localStorage:', favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        if (favorites.some(fav => fav.title === movie.title)) {
            removeFavorite(movie.title).then(() => {
                setFavorites(prevFavorites => {
                    const updatedFavorites = prevFavorites.filter(fav => fav.title !== movie.title);
                    console.log('Removed favorite:', movie.title, 'Updated favorites:', updatedFavorites);
                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    return updatedFavorites;
                });
            });
        } else {
            addFavorite(movie).then(() => {
                setFavorites(prevFavorites => {
                    const updatedFavorites = [...prevFavorites, movie];
                    console.log('Added favorite:', movie.title, 'Updated favorites:', updatedFavorites);
                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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