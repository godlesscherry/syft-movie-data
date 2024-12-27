"use client";

import { useFavorites } from "@/context/FavoritesContext";
import MovieCard from "@/components/movie-card";

export default function FavoriteMovies() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return <div className="text-center text-gray-500">No favorite movies yet.</div>;
    }

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="text-3xl font-bold mb-6">Favorite Movies</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}