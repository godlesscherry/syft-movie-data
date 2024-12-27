"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
    const { favorites, toggleFavorite } = useFavorites();
    const [imgSrc, setImgSrc] = useState(movie.poster);
    const [showPlot, setShowPlot] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const favoriteButtonRef = useRef(null);

    const isFavorite = favorites.some(fav => fav.title === movie.title);

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

    const handleToggleFavorite = (e) => {
        e.stopPropagation(); // Prevent the event from bubbling up to the parent
        toggleFavorite(movie);
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
            <div className="mt-4 flex justify-between items-center relative z-10">
                <h2 className="text-md font-semibold text-gray-800 dark:text-white">
                    {movie.title}
                </h2>
                <button
                    ref={favoriteButtonRef}
                    onClick={handleToggleFavorite}
                    className="text-2xl" // Make the icon bigger
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>
            {showPlot && (
                <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 flex items-center justify-center z-0">
                    <p className="text-center">{movie.plot}</p>
                </div>
            )}
        </div>
    );
}