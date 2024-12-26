"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, getFavorites } from "../server/movies";

export default function MovieCard({ movie }) {
    const [imgSrc, setImgSrc] = useState(movie.poster);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function fetchFavorites() {
            const favorites = await getFavorites();
            setIsFavorite(favorites.some(fav => fav.id === movie.id));
        }
        fetchFavorites();
    }, [movie.id]);

    const handleImageError = () => {
        setImgSrc('/images/fallback-image.png'); // Fallback image
    };

    const toggleFavorite = async () => {
        if (isFavorite) {
            await removeFavorite(movie.id);
        } else {
            await addFavorite(movie);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div key={movie.id} className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Image
                src={imgSrc}
                alt={movie.title}
                className="rounded-lg w-full h-64 object-cover"
                width={300}
                height={450}
                onError={handleImageError}
            />
            <div className="mt-4 flex justify-between items-center">
                <h2 className="text-md font-semibold text-gray-800 dark:text-white">
                    {movie.title}
                </h2>
                <button onClick={toggleFavorite}>
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
                {movie.plot}
            </p>
        </div>        
    );
}