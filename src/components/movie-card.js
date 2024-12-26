"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, getFavorites } from "../server/movies";

export default function MovieCard({ movie }) {
    const [imgSrc, setImgSrc] = useState(movie.poster);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showPlot, setShowPlot] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    useEffect(() => {
        async function fetchFavorites() {
            const favorites = await getFavorites();
            setIsFavorite(favorites.some(fav => fav.id === movie.id));
        }
        fetchFavorites();
    }, [movie.id]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomImage = movie.images[Math.floor(Math.random() * movie.images.length)];
            setImgSrc(randomImage);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, [movie.images]);

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

    const handleMouseEnter = () => {
        const timeout = setTimeout(() => setShowPlot(true), 500);
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setShowPlot(false);
    };

    return (
        <div
            key={movie.id}
            className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
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
            {showPlot && (
                <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 flex items-center justify-center">
                    <p className="text-center">{movie.plot}</p>
                </div>
            )}
        </div>        
    );
}